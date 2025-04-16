import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
console.log("API_KEY", API_KEY);
const ai = new GoogleGenAI({ apiKey: API_KEY });

const chatbotService = {
  // Send user message to AI and get response
  sendMessage: async (userMessage) => {
    try {
      if (!API_KEY) {
        throw new Error("API key is not configured");
      }
      
      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{ text: userMessage }]
        }],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
        systemInstruction: {
          role: "system",
          parts: [{ text: "You are a helpful financial assistant providing clear, concise advice about financial matters. Answer user queries about budgeting, investing, saving, and general financial education. Keep responses informative, practical, and under 100 words when possible." }]
        }
      });

      // Correctly extract text from response
      const responseText = result.response?.text();
      
      if (!responseText) {
        throw new Error("Empty response from AI service");
      }
      
      return {
        message: responseText,
        status: "success"
      };
    } catch (error) {
      console.error("Error calling AI service:", error);
      return {
        message: "I'm having trouble connecting right now. Please try again in a moment.",
        status: "error",
        error: error.message || "Unknown error occurred"
      };
    }
  }
};

export default chatbotService;
