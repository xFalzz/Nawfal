"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

/**
 * Nawfal's Assistant - Groq Edition (Autonomous Brain)
 * Lightning fast Llama 3.3 70B on Groq.
 */

const SYSTEM_INSTRUCTION = `ROLE: Nawfal's Expert AI. INTELLIGENCE: Premium.
CONTEXT:
${JSON.stringify(KNOWLEDGE_BASE)}

CRITICAL RULES:
1. 🛑 LANGUAGE LOCK: DETECT user's language. IGNORE context language. TRANSLATE facts. OUTPUT IN USER'S LANGUAGE ONLY.
2. 🧠 EXPERT ANALYSIS: Don't just list data. ANALYZE & SYNTHESIZE. connect Nawfal's skills to tech trends.
3. 🛡️ FACTS: PRIORITIZE accuracy. NO hallucinations. Verify vs Context.
4. ✨ PRESENTATION: Use Markdown (Bold, Lists). PRO TONE.

EXECUTION:
1. Detect Lang. 2. Fetch Facts. 3. Translate. 4. Answer.`;

export async function getAiResponseAction(prompt: string, history: { role: string, parts: { text: string }[] }[] = []) {
  const apiKey = process.env.GROQ_API_KEY || "";
  
  if (!apiKey) {
    console.error("[NawfalAssistant] ERROR: Groq security key missing.");
    throw new Error("Assistant is offline (Groq Calibration error).");
  }

  try {
    const url = "https://api.groq.com/openai/v1/chat/completions";
    
    // Map history to OpenAI format used by Groq
    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...history.map(m => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.parts[0].text
      })),
      { 
        role: "user", 
        content: prompt + "\n\n[SYSTEM: IGNORE CONTEXT LANG. ANSWER IN THIS PROMPT'S LANGUAGE ONLY.]" 
      }
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[NawfalAssistant] Groq API Error:", errorData);
      throw new Error(errorData.error?.message || "Groq communication failed.");
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    
    if (!text) {
      throw new Error("Autonomous Groq response failed.");
    }

    console.log("[NawfalAssistant] Success: Received response from Groq/Llama");
    return text;
  } catch (error: any) {
    console.error("[NawfalAssistant] Groq System Failure:", error.message);
    throw new Error(`Groq Execution error: ${error.message || "Please check back later"}`);
  }
}
