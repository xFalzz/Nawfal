"use server";

import { KNOWLEDGE_BASE } from "@/lib/knowledge";

/**
 * Nawfal's Assistant - Groq Edition (Autonomous Brain)
 * Lightning fast Llama 3.3 70B on Groq.
 */

const SYSTEM_INSTRUCTION = `You are Nawfal's portfolio assistant. You ONLY answer questions about Nawfal using the CONTEXT below. Be concise and professional.

CONTEXT:
${JSON.stringify(KNOWLEDGE_BASE)}

STRICT RULES:
1. ONLY answer about Nawfal (profile, skills, projects, experience, education, certifications, contact).
2. If asked about ANYTHING outside Nawfal's context (world events, general knowledge, coding help, other people, etc.), reply: "I'm Nawfal's portfolio assistant — I can only help with questions about Nawfal, his projects, and his skills. Feel free to ask about those! 😊"
3. NEVER invent or guess information not in the CONTEXT. If unsure, say "I don't have that specific information about Nawfal."
4. Detect the user's language and reply in the SAME language.
5. Keep answers short and direct. Use Markdown (bold, lists) for clarity.
6. Be friendly and professional.`;

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
        content: prompt 
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
        temperature: 0.3,
        max_tokens: 512,
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
