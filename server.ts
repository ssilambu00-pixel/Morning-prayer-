import express from "express";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gen AI client with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Assembly content schema definition with bilingual Tamil & English support
const assemblyResponseSchema = {
  type: Type.OBJECT,
  properties: {
    date: { type: Type.STRING, description: "Date string formatted like 22-10-2026" },
    day: { type: Type.STRING, description: "Tamil day name like திங்கட்கிழமை, செவ்வாய்க்கிழமை, etc." },
    dayEn: { type: Type.STRING, description: "English day name like Monday, Tuesday, Thursday, etc." },
    schoolNameEn: { type: Type.STRING, description: "School name in English, e.g., Government High School, Sirumadurai" },
    kural: {
      type: Type.OBJECT,
      properties: {
        number: { type: Type.INTEGER, description: "Authentic Thirukkural number (1-1330)" },
        adhigaram: { type: Type.STRING, description: "Adhigaram name in Tamil" },
        adhigaramEn: { type: Type.STRING, description: "Chapter name in English" },
        line1: { type: Type.STRING, description: "First line of Thirukkural (4 cirs)" },
        line2: { type: Type.STRING, description: "Second line of Thirukkural (3 cirs)" },
        meaning: { type: Type.STRING, description: "Simple, clear Tamil meaning in 2 lines" },
        meaningEn: { type: Type.STRING, description: "English couplet translation/meaning" },
      },
      required: ["number", "line1", "line2", "meaning", "meaningEn"],
    },
    englishWords: {
      type: Type.ARRAY,
      description: "5 English words suitable for 8th standard students with Tamil meaning and short English example/definition",
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          meaning: { type: Type.STRING },
          exampleEn: { type: Type.STRING },
        },
        required: ["word", "meaning"],
      },
    },
    math: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "Conceptual mathematics question in Tamil" },
        answer: { type: Type.STRING, description: "One-line answer in Tamil" },
        questionEn: { type: Type.STRING, description: "Conceptual mathematics question in English" },
        answerEn: { type: Type.STRING, description: "One-line answer in English" },
        category: { type: Type.STRING },
        categoryEn: { type: Type.STRING },
      },
      required: ["question", "answer", "questionEn", "answerEn"],
    },
    science: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "Science GK question in Tamil" },
        answer: { type: Type.STRING, description: "Answer in Tamil" },
        questionEn: { type: Type.STRING, description: "Science GK question in English" },
        answerEn: { type: Type.STRING, description: "Answer in English" },
        category: { type: Type.STRING },
        categoryEn: { type: Type.STRING },
      },
      required: ["question", "answer", "questionEn", "answerEn"],
    },
    socialScience: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "Social science question in Tamil" },
        answer: { type: Type.STRING, description: "Answer in Tamil" },
        questionEn: { type: Type.STRING, description: "Social science question in English" },
        answerEn: { type: Type.STRING, description: "Answer in English" },
        category: { type: Type.STRING },
        categoryEn: { type: Type.STRING },
      },
      required: ["question", "answer", "questionEn", "answerEn"],
    },
    sports: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "Sports GK question in Tamil" },
        answer: { type: Type.STRING, description: "Answer in Tamil" },
        questionEn: { type: Type.STRING, description: "Sports GK question in English" },
        answerEn: { type: Type.STRING, description: "Answer in English" },
        category: { type: Type.STRING },
        categoryEn: { type: Type.STRING },
      },
      required: ["question", "answer", "questionEn", "answerEn"],
    },
    generalKnowledge: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "GK question in Tamil" },
        answer: { type: Type.STRING, description: "Answer in Tamil" },
        questionEn: { type: Type.STRING, description: "GK question in English" },
        answerEn: { type: Type.STRING, description: "Answer in English" },
        category: { type: Type.STRING },
        categoryEn: { type: Type.STRING },
      },
      required: ["question", "answer", "questionEn", "answerEn"],
    },
    abbreviation: {
      type: Type.OBJECT,
      properties: {
        shortForm: { type: Type.STRING, description: "Abbreviation like ISRO, UNESCO, RAM, DNA" },
        fullForm: { type: Type.STRING, description: "Official expansion in English" },
        tamilMeaning: { type: Type.STRING, description: "Tamil meaning or explanation" },
      },
      required: ["shortForm", "fullForm", "tamilMeaning"],
    },
    proverb: {
      type: Type.OBJECT,
      properties: {
        english: { type: Type.STRING, description: "Well established English proverb" },
        tamilEquivalent: { type: Type.STRING, description: "Natural equivalent Tamil proverb" },
      },
      required: ["english", "tamilEquivalent"],
    },
    footerQuote1En: { type: Type.STRING },
    footerQuote2En: { type: Type.STRING },
  },
  required: [
    "date",
    "day",
    "kural",
    "englishWords",
    "math",
    "science",
    "socialScience",
    "sports",
    "generalKnowledge",
    "abbreviation",
    "proverb",
  ],
};

// API route to generate daily morning assembly content with bilingual support
app.post("/api/generate-assembly", async (req, res) => {
  try {
    const { date, day, schoolName, schoolNameEn, excludeKurals = [] } = req.body;

    const prompt = `You are an expert bilingual educator for Tamil Nadu Government Schools (supporting both Tamil Medium and English Medium).
Generate content for a Tamil Nadu Government School Morning Assembly Educational Poster (பள்ளி காலை வழிப்பாட்டு செயல்பாடுகள்) for:
Date: ${date || "இன்றைய தேதி"}
Day: ${day || "இன்றைய நாள்"}
School (Tamil): ${schoolName || "அரசு உயர்நிலைப்பள்ளி, சிறுமதுரை"}
School (English): ${schoolNameEn || "Government High School, Sirumadurai"}

Provide complete high-accuracy content in BOTH Tamil and English for all 9 sections:
1. Thirukkural (திருக்குறள்): Authentic Thirukkural with Kural number (do not repeat ${excludeKurals.slice(0, 10).join(", ")}). Line 1 (4 words) and Line 2 (3 words). Simple Tamil meaning + English couplet translation (meaningEn).
2. English -> Tamil: 5 Grade 8 vocabulary words with Tamil meaning and short English example/definition.
3. Conceptual Mathematics (கணித சிந்தனை): Geometry facts, formulas, units, mathematicians. Provide question and answer in Tamil AND questionEn and answerEn in English. (No numerical solving exercises).
4. Science GK (அறிவியல் சிந்தனை): Biology, Physics, Chemistry, or Space. Provide in Tamil and English (questionEn, answerEn).
5. Social Science (சமூக அறிவியல் சிந்தனை): History, Geography, Civics, Economics. Provide in Tamil and English.
6. Physical Education (உடற்கல்வி சிந்தனை): Sports GK factual question. Provide in Tamil and English.
7. General Knowledge (பொது அறிவு): Interesting reliable GK. Provide in Tamil and English.
8. Abbreviation: Short form, official full form, and Tamil explanation.
9. Proverb: Classic English proverb and natural Tamil equivalent proverb.

Ensure 100% correct Tamil and English orthography, grammar, and factual accuracy. Return only valid JSON conforming strictly to the response schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a master bilingual educator for Tamil Nadu schools, skilled in curriculum development in both Tamil and English.",
        responseMimeType: "application/json",
        responseSchema: assemblyResponseSchema,
        temperature: 0.3,
      },
    });

    const contentText = response.text;
    if (!contentText) {
      throw new Error("No response from Gemini API");
    }

    const parsedData = JSON.parse(contentText);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Error generating assembly content:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate morning assembly content",
    });
  }
});

// Vite middleware integration for dev mode or static files for prod
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(process.cwd(), "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist", "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
