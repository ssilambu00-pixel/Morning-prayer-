export type LanguageMode = "ta" | "en" | "bilingual";

export interface KuralItem {
  number: number;
  line1: string;
  line2: string;
  meaning: string;
  meaningEn?: string;
  adhigaram?: string;
  adhigaramEn?: string;
}

export interface VocabularyWord {
  word: string;
  meaning: string;
  partOfSpeech?: string;
  exampleEn?: string;
}

export interface QAPair {
  question: string;
  answer: string;
  category?: string;
  questionEn?: string;
  answerEn?: string;
  categoryEn?: string;
}

export interface AbbreviationItem {
  shortForm: string;
  fullForm: string;
  tamilMeaning: string;
}

export interface ProverbItem {
  english: string;
  tamilEquivalent: string;
}

export interface MorningAssemblyData {
  id: string;
  date: string; // e.g. "22-10-2026"
  day: string; // e.g. "வியாழக்கிழமை"
  dayEn?: string; // e.g. "Thursday"
  schoolName: string;
  schoolNameEn?: string;
  schoolSubtext?: string;
  schoolSubtextEn?: string;
  academicYear?: string;
  kural: KuralItem;
  englishWords: VocabularyWord[]; // exactly 5
  math: QAPair;
  science: QAPair;
  socialScience: QAPair;
  sports: QAPair;
  generalKnowledge: QAPair;
  abbreviation: AbbreviationItem;
  proverb: ProverbItem;
  footerQuote1: string;
  footerQuote1En?: string;
  footerQuote2: string;
  footerQuote2En?: string;
}
