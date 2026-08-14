/**
 * In-Memory Sliding Window Rate Limiter for Server Actions & API routes.
 * Limits requests based on unique identifier (e.g. Client IP address).
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipMap.forEach((record, key) => {
      if (now > record.resetTime) {
        ipMap.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number;        // Max requests within window (default: 12)
  windowMs?: number;     // Window duration in ms (default: 60,000ms / 1 min)
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit ?? 12;
  const windowMs = options.windowMs ?? 60 * 1000;
  const now = Date.now();

  const record = ipMap.get(identifier);

  if (!record || now > record.resetTime) {
    ipMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}
