import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CEFRLevel, Skill, ExerciseSet } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const exerciseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy title for the exercise set." },
    instructions: { type: Type.STRING, description: "Instructions for the student." },
    readingText: { type: Type.STRING, description: "A short text/story if the skill is Reading. Null otherwise." },
    lesson: {
      type: Type.OBJECT,
      description: "Educational content explaining the topic before the quiz.",
      properties: {
        intro: { type: Type.STRING, description: "A brief introduction to the topic in Portuguese." },
        sections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Title of the grammar rule or concept." },
              content: { type: Type.STRING, description: "Explanation of the rule in Portuguese. Use simple formatting." },
              examples: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of English examples with Portuguese translations in parentheses."
              }
            },
            required: ["title", "content", "examples"]
          }
        }
      },
      required: ["intro", "sections"]
    },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          questionText: { type: Type.STRING, description: "The question or sentence with a blank." },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of 4 possible answers."
          },
          correctAnswerIndex: { type: Type.INTEGER, description: "Index of the correct option (0-3)." },
          explanationPt: { type: Type.STRING, description: "Explanation of why the answer is correct, written in Portuguese." }
        },
        required: ["id", "questionText", "options", "correctAnswerIndex", "explanationPt"]
      }
    }
  },
  required: ["title", "instructions", "questions", "lesson"]
};

export const generateExercise = async (level: CEFRLevel, skill: Skill, topic: string): Promise<ExerciseSet> => {
  const model = "gemini-2.5-flash";

  let prompt = "";

  if (skill === Skill.READING) {
    prompt = `Create a Reading Comprehension lesson and exercise for Level ${level} students.
    Topic: ${topic}.
    Target Audience: Brazilian Portuguese speakers learning English.
    1. READING TEXT: Generate a short text (approx 150-200 words) appropriate for ${level} level.
    2. LESSON: Provide a brief guide on reading strategies or vocabulary used in the text (in Portuguese).
    3. EXERCISE: Create 4 multiple choice questions based on the text.
    4. EXPLANATION: The explanationPt for questions must be in Portuguese.`;
  } else {
    prompt = `Create a ${skill} lesson and exercise set for Level ${level} students.
    Topic: ${topic}.
    Target Audience: Brazilian Portuguese speakers learning English.
    
    PART 1: THE LESSON (In Portuguese)
    - Explain the grammar rules or vocabulary usage clearly.
    - Break it down into 2-3 logical sections (e.g., "Affirmative Form", "Negative Form", "Common Mistakes").
    - HIGHLIGHT common mistakes Brazilians make (e.g., False Cognates, prepositions).
    - Provide clear examples.

    PART 2: THE EXERCISE
    - Create 5 multiple choice questions.
    - The explanationPt for each question must be in Portuguese.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: exerciseSchema,
        temperature: 0.5, // Lower temperature for more accurate educational content
      },
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as ExerciseSet;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};