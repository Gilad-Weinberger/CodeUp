import { GoogleGenerativeAI } from "@google/generative-ai";

export async function BuildCourse(courseData) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );
    const model = await genAI.getGenerativeModel("gemini-1.5-flash");
    
  } catch (error) {
    console.error("Error generating model:", error);
    throw error;
  }
}
