import { GoogleGenerativeAI } from "@google/generative-ai";

// Retry Function
async function safeGenerateContent(model, prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result;
    } catch (error) {
      console.warn(`Retrying Gemini API... Attempt ${i + 1}`);
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, 1000 * (i + 1))); // Backoff: 1s, 2s, 3s
    }
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Simple keyword-based intent check (you can later replace this with AI intent detection)
    const lowerMsg = message.toLowerCase();
    const isSchedulingRequest =
      lowerMsg.includes("schedule") ||
      lowerMsg.includes("book a meeting") ||
      lowerMsg.includes("set up a call") ||
      lowerMsg.includes("meeting");

    if (isSchedulingRequest) {
      // You can generate these dynamically too
      const slots = ["10:00 AM", "1:30 PM", "4:00 PM"];

      return new Response(JSON.stringify({
        reply: "Sure! Here are some available time slots. Please select one:",
        type: "slots",
        slots,
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Otherwise, use Gemini to respond
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an AI assistant for a career guidance platform.
1. Answer clearly and concisely.
2. Only respond to career-related queries.
3. Make sure to remember the conversations.
4. If the user asks to contact an expert, reply:
"Sure! You can reach our expert at:
Email: kruthikmanubolu@gmail.com
Phone: +1-458-272-4928"

User's Question: "${message}"
`;

    const result = await safeGenerateContent(model, prompt);
    const reply = result.response.text().trim();

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({
      reply:
        "Our AI assistant is currently busy. Please try again later or contact us directly at kruthikmanubolu@gmail.com.",
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
