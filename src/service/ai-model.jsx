import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateTripPlan = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;
    const candidate = response?.candidates?.[0];
    const contentPart = candidate?.content?.parts?.[0];

    if (!contentPart?.text) {
      throw new Error("No text found in Gemini response.");
    }
    const rawText = contentPart.text;
    const cleanedText = rawText
    .replace(/```json\s*([\s\S]*?)```/, '$1')
    .trim();

    let parsedJson;
    try {
    parsedJson = JSON.parse(cleanedText);
    } catch (e) {
    console.error("Failed to parse response as JSON:", e);
    throw e;
    }

    return parsedJson;
  } catch (error) {
    console.error("Error generating trip plan:", error);
    throw error;
  }
  
};
