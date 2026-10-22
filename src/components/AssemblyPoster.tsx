import React from "react";
import { MorningAssemblyData, LanguageMode } from "../types/assembly";
import {
  TamilNaduEmblem,
  GreenKnowledgeTree,
  OpenBookWithSunrise,
} from "./TamilEmblem";
import {
  ThiruvalluvarIcon,
  VocabularyIcon,
  MathConceptIcon,
  ScienceIcon,
  SocialScienceIcon,
  SportsIcon,
  GeneralKnowledgeIcon,
  AbbreviationIcon,
  ProverbIcon,
  FooterGarlandBanner,
} from "./EducationalIllustrations";

interface AssemblyPosterProps {
  data: MorningAssemblyData;
  scale?: number;
  isPrintPreview?: boolean;
  languageMode?: LanguageMode;
  onEditField?: (field: string) => void;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export const AssemblyPoster: React.FC<AssemblyPosterProps> = ({
  data,
  scale = 1,
  isPrintPreview = false,
  languageMode = "ta",
  innerRef,
}) => {
  const isEn = languageMode === "en";
  const isBi = languageMode === "bilingual";

  return (
    <div
      ref={innerRef}
      id="a4-poster-root"
      className={`poster-a4-sheet bg-white text-slate-900 mx-auto select-none overflow-hidden relative flex flex-col justify-between ${
        isPrintPreview
          ? "border-0 shadow-none"
          : "shadow-2xl border-4 border-amber-600/30 rounded-2xl"
      }`}
      style={{
        width: "794px", // Standard 96 DPI A4 width (exact ratio to 2480px)
        minHeight: "1123px", // Standard 96 DPI A4 height (exact ratio to 3508px)
        maxHeight: "1123px",
        boxSizing: "border-box",
        padding: "16px 20px 14px 20px",
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
      }}
    >
      {/* Decorative Outer Border with traditional temple garland accents */}
      <div className="absolute inset-1.5 border-2 border-dashed border-amber-500/40 rounded-xl pointer-events-none" />
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-700" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-700" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-700" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-700" />

      {/* ===================== SCHOOL HEADER ===================== */}
      <header className="relative z-10 border-b-2 border-amber-600/40 pb-2 bg-gradient-to-r from-amber-50/60 via-white to-emerald-50/60 rounded-xl p-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Top-Left: School / Tamil Nadu Official Emblem */}
          <div className="flex flex-col items-center shrink-0">
            <TamilNaduEmblem size={64} className="hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-red-900 mt-0.5 tracking-tight font-tamil-display">
              {isEn ? "Govt of Tamil Nadu" : "தமிழ்நாடு அரசு"}
            </span>
          </div>

          {/* Center: School Name, Title, Subtitle & Sunrise Book */}
          <div className="flex-1 text-center px-1">
            {/* School Name */}
            <div className="flex items-center justify-center gap-1.5 text-red-900">
              <span className="text-base">🏫</span>
              <h1 className="text-xl font-extrabold tracking-wide font-tamil-display text-red-900 leading-tight">
                {isEn
                  ? data.schoolNameEn || data.schoolName
                  : isBi
                  ? `${data.schoolName} / ${data.schoolNameEn || "Govt High School"}`
                  : data.schoolName}
              </h1>
            </div>

            {/* Department subtitle */}
            <p className="text-[11px] font-medium text-slate-600 font-tamil-body -mt-0.5">
              {isEn
                ? `${data.schoolSubtextEn || "Department of School Education, Govt of Tamil Nadu"} · Academic Year: ${data.academicYear || "2026-27"}`
                : `${data.schoolSubtext || "பள்ளி கல்வித்துறை, தமிழ்நாடு அரசு"} · கல்வி ஆண்டு: ${data.academicYear || "2026-27"}`}
            </p>

            {/* Main Title Ribbon */}
            <div className="my-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 text-white px-5 py-1 rounded-full shadow-sm">
              <span className="text-sm">📚</span>
              <h2 className="text-base font-bold tracking-wide font-tamil-display">
                {isEn
                  ? "School Morning Assembly Activities"
                  : isBi
                  ? "பள்ளி காலை வழிப்பாட்டு செயல்பாடுகள் · Assembly"
                  : "பள்ளி காலை வழிப்பாட்டு செயல்பாடுகள்"}
              </h2>
            </div>

            {/* Subtitle & Open Book with Sunrise */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-amber-800 font-tamil-display">
                {isEn ? "📖 Pearls of Today's Knowledge" : "📖 இன்றைய கல்வி முத்துக்கள்"}
              </span>
              <OpenBookWithSunrise className="w-24 h-6 inline-block" />
            </div>
          </div>

          {/* Top-Right: Green Tree Illustration */}
          <div className="flex flex-col items-center shrink-0">
            <GreenKnowledgeTree size={62} className="hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-emerald-800 mt-0.5 tracking-tight font-tamil-display">
              {isEn ? "Knowledge is Power" : "அறிவே ஆற்றல்"}
            </span>
          </div>
        </div>

        {/* Date, Day and Motto Badges Banner */}
        <div className="mt-2 flex items-center justify-between bg-amber-100/80 border border-amber-300 rounded-lg px-3 py-1 text-xs font-tamil-body text-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <span className="text-sm">📅</span>
            <span>{isEn ? "Day:" : "நாள்:"}</span>
            <span className="text-blue-700 bg-white px-2 py-0.5 rounded shadow-2xs font-semibold">
              {isEn ? data.dayEn || data.day : isBi ? `${data.day} (${data.dayEn || ""})` : data.day}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
            <span className="text-emerald-700">🎯 {isEn ? "Motto:" : "இன்றைய குறிக்கோள்:"}</span>
            <span className="text-slate-800 italic">
              {isEn
                ? '"Curiosity in Learning, Discipline in Life"'
                : '"கற்றலில் ஆர்வம், வாழ்வில் ஒழுக்கம்"'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-red-900">
            <span className="text-sm">📅</span>
            <span>{isEn ? "Date:" : "தேதி:"}</span>
            <span className="text-red-700 bg-white px-2 py-0.5 rounded shadow-2xs font-semibold">
              {data.date}
            </span>
          </div>
        </div>
      </header>

      {/* ===================== EXACTLY 9 NUMBERED SECTIONS ===================== */}
      <main className="flex-1 grid grid-cols-12 gap-2 mt-2 font-tamil-body">
        {/* ① 📖 திருக்குறள் (Full Width Feature Card) */}
        <section className="col-span-12 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border-2 border-amber-400/80 rounded-xl p-2.5 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-2.5">
            <div className="shrink-0 mt-0.5">
              <ThiruvalluvarIcon size={40} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between border-b border-amber-300/80 pb-1 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-red-700 text-white text-[11px] font-black flex items-center justify-center font-tamil-display">
                    ①
                  </span>
                  <h3 className="text-sm font-extrabold text-red-900 font-tamil-display tracking-wide">
                    {isEn ? "📖 THIRUKKURAL" : isBi ? "📖 திருக்குறள் (Thirukkural)" : "📖 திருக்குறள்"}
                  </h3>
                  {(data.kural.adhigaram || data.kural.adhigaramEn) && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-200/70 px-1.5 py-0.2 rounded">
                      {isEn
                        ? `Chapter: ${data.kural.adhigaramEn || data.kural.adhigaram}`
                        : isBi
                        ? `அதிகாரம்: ${data.kural.adhigaram} (${data.kural.adhigaramEn || ""})`
                        : `அதிகாரம்: ${data.kural.adhigaram}`}
                    </span>
                  )}
                </div>
                <span className="text-xs font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded font-tamil-display border border-amber-400">
                  {isEn ? `Kural No: ${data.kural.number}` : `குறள் எண்: ${data.kural.number}`}
                </span>
              </div>

              {/* Exact Two-Line Kural */}
              <div className="bg-white/90 border-l-4 border-red-700 px-3 py-1 rounded shadow-2xs">
                <p className="text-[13px] font-bold text-slate-900 leading-snug tracking-wide font-tamil-display">
                  {data.kural.line1}
                </p>
                <p className="text-[13px] font-bold text-slate-900 leading-snug tracking-wide font-tamil-display">
                  {data.kural.line2}
                </p>
              </div>

              {/* Simple Meaning (Tamil and/or English Couplet Meaning) */}
              <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-slate-800 leading-tight">
                {!isEn && (
                  <div className="flex items-start gap-1">
                    <span className="font-extrabold text-red-800 shrink-0 font-tamil-display">பொருள்:</span>
                    <p className="font-medium">{data.kural.meaning}</p>
                  </div>
                )}
                {(isEn || isBi) && data.kural.meaningEn && (
                  <div className="flex items-start gap-1 text-slate-700 italic">
                    <span className="font-bold text-blue-800 shrink-0 not-italic font-sans">
                      {isEn ? "Meaning:" : "English:"}
                    </span>
                    <p className="font-medium">{data.kural.meaningEn}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ② 🔤 ENGLISH → TAMIL (Col 1-6) */}
        <section className="col-span-6 bg-gradient-to-b from-blue-50/70 to-indigo-50/40 border-2 border-blue-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 border-b border-blue-200 pb-1 mb-1">
              <span className="w-4 h-4 rounded-full bg-blue-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                ②
              </span>
              <VocabularyIcon size={22} />
              <h3 className="text-xs font-bold text-blue-900 font-tamil-display">
                {isEn
                  ? "🔤 VOCABULARY (ENGLISH → TAMIL)"
                  : isBi
                  ? "🔤 ENGLISH → TAMIL (சொற்களஞ்சியம்)"
                  : "🔤 ENGLISH → TAMIL (சொற்களஞ்சியம்)"}
              </h3>
            </div>

            {/* Exactly 5 vocabulary words suitable for 8th standard */}
            <ol className="space-y-1 text-[11px] font-tamil-body">
              {data.englishWords.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-white/95 px-2 py-0.5 rounded border border-blue-100 shadow-2xs"
                >
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-blue-950 font-sans tracking-wide">
                      {idx + 1}. {item.word}
                    </span>
                    {item.exampleEn && (isEn || isBi) && (
                      <span className="text-[9.5px] text-slate-500 font-sans italic hidden sm:inline">
                        ({item.exampleEn})
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 text-[10px] mx-1">—</span>
                  <span className="font-semibold text-slate-800 font-tamil-body text-right">
                    {item.meaning}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <span className="text-[9px] text-blue-700 font-semibold text-right block mt-0.5">
            {isEn ? "* Grade 8 Curriculum Vocabulary" : "* 8-ஆம் வகுப்பு பாடத்திட்ட சிறப்புச் சொற்கள்"}
          </span>
        </section>

        {/* ③ 📐 கணித சிந்தனை (Col 7-12) */}
        <section className="col-span-6 bg-gradient-to-b from-emerald-50/70 to-teal-50/40 border-2 border-emerald-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                  ③
                </span>
                <MathConceptIcon size={22} />
                <h3 className="text-xs font-bold text-emerald-900 font-tamil-display">
                  {isEn
                    ? "📐 CONCEPTUAL MATHEMATICS"
                    : isBi
                    ? "📐 கணித சிந்தனை (Math Concept)"
                    : "📐 கணித சிந்தனை (கருத்து வினா)"}
                </h3>
              </div>
              {(data.math.category || data.math.categoryEn) && (
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                  {isEn ? data.math.categoryEn || data.math.category : data.math.category}
                </span>
              )}
            </div>

            <div className="bg-white/95 p-1.5 rounded border border-emerald-100 shadow-2xs space-y-1">
              <div className="text-[11.5px] font-semibold text-slate-900 leading-tight">
                <span className="font-bold text-emerald-800 font-tamil-display">
                  {isEn ? "Question: " : "வினா: "}
                </span>
                {isEn ? data.math.questionEn || data.math.question : data.math.question}
                {isBi && data.math.questionEn && (
                  <span className="block text-[10.5px] text-slate-600 font-sans italic mt-0.5">
                    ({data.math.questionEn})
                  </span>
                )}
              </div>
              <div className="text-[11.5px] font-bold text-emerald-900 bg-emerald-50/90 p-1 rounded border-l-2 border-emerald-600">
                <span className="font-extrabold text-emerald-800 font-tamil-display">
                  {isEn ? "Answer: " : "விடை: "}
                </span>
                {isEn ? data.math.answerEn || data.math.answer : data.math.answer}
                {isBi && data.math.answerEn && (
                  <span className="text-[10.5px] font-sans text-emerald-700 ml-1">
                    / {data.math.answerEn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-emerald-700 font-medium text-right block mt-0.5">
            {isEn ? "Geometry & Formula Concepts" : "வடிவியல் & சூத்திரக் கருத்துக்கள்"}
          </span>
        </section>

        {/* ④ 🔬 அறிவியல் சிந்தனை (Col 1-6) */}
        <section className="col-span-6 bg-gradient-to-b from-purple-50/70 to-fuchsia-50/40 border-2 border-purple-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-purple-200 pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                  ④
                </span>
                <ScienceIcon size={22} />
                <h3 className="text-xs font-bold text-purple-900 font-tamil-display">
                  {isEn
                    ? "🔬 SCIENCE GK & CONCEPTS"
                    : isBi
                    ? "🔬 அறிவியல் சிந்தனை (Science GK)"
                    : "🔬 அறிவியல் சிந்தனை (Science GK)"}
                </h3>
              </div>
              {(data.science.category || data.science.categoryEn) && (
                <span className="text-[9px] font-bold text-purple-800 bg-purple-100 px-1.5 py-0.2 rounded">
                  {isEn ? data.science.categoryEn || data.science.category : data.science.category}
                </span>
              )}
            </div>

            <div className="bg-white/95 p-1.5 rounded border border-purple-100 shadow-2xs space-y-1">
              <div className="text-[11.5px] font-semibold text-slate-900 leading-tight">
                <span className="font-bold text-purple-800 font-tamil-display">
                  {isEn ? "Question: " : "வினா: "}
                </span>
                {isEn ? data.science.questionEn || data.science.question : data.science.question}
                {isBi && data.science.questionEn && (
                  <span className="block text-[10.5px] text-slate-600 font-sans italic mt-0.5">
                    ({data.science.questionEn})
                  </span>
                )}
              </div>
              <div className="text-[11.5px] font-bold text-purple-950 bg-purple-50/90 p-1 rounded border-l-2 border-purple-600">
                <span className="font-extrabold text-purple-800 font-tamil-display">
                  {isEn ? "Answer: " : "விடை: "}
                </span>
                {isEn ? data.science.answerEn || data.science.answer : data.science.answer}
                {isBi && data.science.answerEn && (
                  <span className="text-[10.5px] font-sans text-purple-700 ml-1">
                    / {data.science.answerEn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-purple-700 font-medium text-right block mt-0.5">
            {isEn ? "Biology / Physics / Space" : "உயிரியல் / இயற்பியல் / விண்வெளி"}
          </span>
        </section>

        {/* ⑤ 🌍 சமூக அறிவியல் சிந்தனை (Col 7-12) */}
        <section className="col-span-6 bg-gradient-to-b from-orange-50/70 to-amber-50/40 border-2 border-orange-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-orange-200 pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-orange-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                  ⑤
                </span>
                <SocialScienceIcon size={22} />
                <h3 className="text-xs font-bold text-orange-900 font-tamil-display">
                  {isEn
                    ? "🌍 SOCIAL SCIENCE"
                    : isBi
                    ? "🌍 சமூக அறிவியல் (Social Science)"
                    : "🌍 சமூக அறிவியல் சிந்தனை"}
                </h3>
              </div>
              {(data.socialScience.category || data.socialScience.categoryEn) && (
                <span className="text-[9px] font-bold text-orange-800 bg-orange-100 px-1.5 py-0.2 rounded">
                  {isEn ? data.socialScience.categoryEn || data.socialScience.category : data.socialScience.category}
                </span>
              )}
            </div>

            <div className="bg-white/95 p-1.5 rounded border border-orange-100 shadow-2xs space-y-1">
              <div className="text-[11.5px] font-semibold text-slate-900 leading-tight">
                <span className="font-bold text-orange-800 font-tamil-display">
                  {isEn ? "Question: " : "வினா: "}
                </span>
                {isEn ? data.socialScience.questionEn || data.socialScience.question : data.socialScience.question}
                {isBi && data.socialScience.questionEn && (
                  <span className="block text-[10.5px] text-slate-600 font-sans italic mt-0.5">
                    ({data.socialScience.questionEn})
                  </span>
                )}
              </div>
              <div className="text-[11.5px] font-bold text-orange-950 bg-orange-50/90 p-1 rounded border-l-2 border-orange-600">
                <span className="font-extrabold text-orange-800 font-tamil-display">
                  {isEn ? "Answer: " : "விடை: "}
                </span>
                {isEn ? data.socialScience.answerEn || data.socialScience.answer : data.socialScience.answer}
                {isBi && data.socialScience.answerEn && (
                  <span className="text-[10.5px] font-sans text-orange-700 ml-1">
                    / {data.socialScience.answerEn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-orange-700 font-medium text-right block mt-0.5">
            {isEn ? "History / Geography / Civics" : "வரலாறு / புவியியல் / குடிமையியல்"}
          </span>
        </section>

        {/* ⑥ ⚽ உடற்கல்வி சிந்தனை (Col 1-6) */}
        <section className="col-span-6 bg-gradient-to-b from-sky-50/70 to-blue-50/40 border-2 border-sky-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-sky-200 pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                  ⑥
                </span>
                <SportsIcon size={22} />
                <h3 className="text-xs font-bold text-sky-900 font-tamil-display">
                  {isEn
                    ? "⚽ PHYSICAL EDUCATION (Sports GK)"
                    : isBi
                    ? "⚽ உடற்கல்வி (Sports GK)"
                    : "⚽ உடற்கல்வி சிந்தனை (Sports GK)"}
                </h3>
              </div>
              {(data.sports.category || data.sports.categoryEn) && (
                <span className="text-[9px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded">
                  {isEn ? data.sports.categoryEn || data.sports.category : data.sports.category}
                </span>
              )}
            </div>

            <div className="bg-white/95 p-1.5 rounded border border-sky-100 shadow-2xs space-y-1">
              <div className="text-[11.5px] font-semibold text-slate-900 leading-tight">
                <span className="font-bold text-sky-800 font-tamil-display">
                  {isEn ? "Question: " : "வினா: "}
                </span>
                {isEn ? data.sports.questionEn || data.sports.question : data.sports.question}
                {isBi && data.sports.questionEn && (
                  <span className="block text-[10.5px] text-slate-600 font-sans italic mt-0.5">
                    ({data.sports.questionEn})
                  </span>
                )}
              </div>
              <div className="text-[11.5px] font-bold text-sky-950 bg-sky-50/90 p-1 rounded border-l-2 border-sky-600">
                <span className="font-extrabold text-sky-800 font-tamil-display">
                  {isEn ? "Answer: " : "விடை: "}
                </span>
                {isEn ? data.sports.answerEn || data.sports.answer : data.sports.answer}
                {isBi && data.sports.answerEn && (
                  <span className="text-[10.5px] font-sans text-sky-700 ml-1">
                    / {data.sports.answerEn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-sky-700 font-medium text-right block mt-0.5">
            {isEn ? "Sports & Fitness Trivia" : "விளையாட்டு & உடல்நலம்"}
          </span>
        </section>

        {/* ⑦ 💡 பொது அறிவு (Col 7-12) */}
        <section className="col-span-6 bg-gradient-to-b from-yellow-50/70 to-amber-50/40 border-2 border-yellow-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-yellow-200 pb-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-yellow-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                  ⑦
                </span>
                <GeneralKnowledgeIcon size={22} />
                <h3 className="text-xs font-bold text-yellow-950 font-tamil-display">
                  {isEn
                    ? "💡 GENERAL KNOWLEDGE"
                    : isBi
                    ? "💡 பொது அறிவு (General Knowledge)"
                    : "💡 பொது அறிவு (General Knowledge)"}
                </h3>
              </div>
              {(data.generalKnowledge.category || data.generalKnowledge.categoryEn) && (
                <span className="text-[9px] font-bold text-yellow-800 bg-yellow-100 px-1.5 py-0.2 rounded">
                  {isEn ? data.generalKnowledge.categoryEn || data.generalKnowledge.category : data.generalKnowledge.category}
                </span>
              )}
            </div>

            <div className="bg-white/95 p-1.5 rounded border border-yellow-100 shadow-2xs space-y-1">
              <div className="text-[11.5px] font-semibold text-slate-900 leading-tight">
                <span className="font-bold text-yellow-800 font-tamil-display">
                  {isEn ? "Question: " : "வினா: "}
                </span>
                {isEn ? data.generalKnowledge.questionEn || data.generalKnowledge.question : data.generalKnowledge.question}
                {isBi && data.generalKnowledge.questionEn && (
                  <span className="block text-[10.5px] text-slate-600 font-sans italic mt-0.5">
                    ({data.generalKnowledge.questionEn})
                  </span>
                )}
              </div>
              <div className="text-[11.5px] font-bold text-amber-950 bg-yellow-50/90 p-1 rounded border-l-2 border-amber-600">
                <span className="font-extrabold text-amber-800 font-tamil-display">
                  {isEn ? "Answer: " : "விடை: "}
                </span>
                {isEn ? data.generalKnowledge.answerEn || data.generalKnowledge.answer : data.generalKnowledge.answer}
                {isBi && data.generalKnowledge.answerEn && (
                  <span className="text-[10.5px] font-sans text-amber-700 ml-1">
                    / {data.generalKnowledge.answerEn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-amber-700 font-medium text-right block mt-0.5">
            {isEn ? "World & Indian Facts" : "உலக & இந்திய சாதனைத் தகவல்கள்"}
          </span>
        </section>

        {/* ⑧ 🔤 ABBREVIATION (Col 1-6) */}
        <section className="col-span-6 bg-gradient-to-b from-rose-50/70 to-pink-50/40 border-2 border-rose-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 border-b border-rose-200 pb-1 mb-1">
              <span className="w-4 h-4 rounded-full bg-rose-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                ⑧
              </span>
              <AbbreviationIcon size={22} />
              <h3 className="text-xs font-bold text-rose-900 font-tamil-display">
                {isEn
                  ? "🔤 ABBREVIATION & FULL FORM"
                  : isBi
                  ? "🔤 ABBREVIATION (சுருக்கச்சொல் விரிவாக்கம்)"
                  : "🔤 ABBREVIATION (சுருக்கச்சொல் விளக்கம்)"}
              </h3>
            </div>

            <div className="bg-white/95 p-2 rounded border border-rose-100 shadow-2xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-rose-700 text-white font-extrabold text-xs px-2 py-0.5 rounded font-mono shadow-2xs">
                  {data.abbreviation.shortForm}
                </span>
                <span className="text-[11px] font-bold text-slate-900 font-sans">
                  {data.abbreviation.fullForm}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-rose-950 pt-0.5 border-t border-rose-100">
                <span className="font-bold text-rose-800 font-tamil-display">
                  {isEn ? "Tamil Meaning: " : "தமிழ்: "}
                </span>
                {data.abbreviation.tamilMeaning}
              </div>
            </div>
          </div>
          <span className="text-[9px] text-rose-700 font-medium text-right block mt-0.5">
            {isEn ? "Govt / Science / Education" : "அரசு / அறிவியல் / கல்வி நிறுவனங்கள்"}
          </span>
        </section>

        {/* ⑨ 🗣️ பழமொழி (Col 7-12) */}
        <section className="col-span-6 bg-gradient-to-b from-teal-50/70 to-emerald-50/40 border-2 border-teal-300/90 rounded-xl p-2 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 border-b border-teal-200 pb-1 mb-1">
              <span className="w-4 h-4 rounded-full bg-teal-700 text-white text-[10px] font-black flex items-center justify-center font-tamil-display">
                ⑨
              </span>
              <ProverbIcon size={22} />
              <h3 className="text-xs font-bold text-teal-900 font-tamil-display">
                {isEn ? "🗣️ PROVERB" : "🗣️ பழமொழி (PROVERB)"}
              </h3>
            </div>

            <div className="bg-white/95 p-2 rounded border border-teal-100 shadow-2xs space-y-1">
              <div className="text-[11px] text-slate-900 leading-tight">
                <span className="font-bold text-teal-800">English Proverb: </span>
                <span className="font-medium italic text-slate-800">"{data.proverb.english}"</span>
              </div>
              <div className="text-[11.5px] font-bold text-teal-950 bg-teal-50/90 p-1 rounded border-l-2 border-teal-600">
                <span className="font-extrabold text-teal-800 font-tamil-display">
                  {isEn ? "Tamil Equivalent: " : "தமிழ் இணை: "}
                </span>
                <span>"{data.proverb.tamilEquivalent}"</span>
              </div>
            </div>
          </div>
          <span className="text-[9px] text-teal-700 font-medium text-right block mt-0.5">
            {isEn ? "Values & Life Wisdom" : "வாழ்வியல் நற்பண்புகள்"}
          </span>
        </section>
      </main>

      {/* ===================== FOOTER WITH EXACT MOTIVATIONAL QUOTES ===================== */}
      <footer className="relative z-10 mt-2 border-t-2 border-amber-600/40 pt-1.5 bg-gradient-to-r from-amber-50/80 via-white to-emerald-50/80 rounded-xl px-3 py-1.5">
        {/* Exact Motivational Quotes as mandated */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-lg shadow-xs flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-wide font-tamil-display">
              "{isEn ? data.footerQuote1En || data.footerQuote1 : data.footerQuote1}"
            </p>
            {isBi && data.footerQuote1En && (
              <p className="text-[9.5px] font-sans font-medium text-rose-100 italic">
                "{data.footerQuote1En}"
              </p>
            )}
          </div>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-lg shadow-xs flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-wide font-tamil-display">
              "{isEn ? data.footerQuote2En || data.footerQuote2 : data.footerQuote2}"
            </p>
            {isBi && data.footerQuote2En && (
              <p className="text-[9.5px] font-sans font-medium text-emerald-100 italic">
                "{data.footerQuote2En}"
              </p>
            )}
          </div>
        </div>

        {/* School Children, Green Leaves, Floral Garland */}
        <FooterGarlandBanner />

        {/* Official School Seal & HM Signature strip for official notice board */}
        <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-amber-200/60 pt-1 px-2 font-tamil-body">
          <div className="flex items-center gap-1 text-slate-500">
            <span>{isEn ? "Morning Assembly Committee" : "காலை வழிபாட்டு ஆசிரியர் குழு"}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="border-b border-dotted border-slate-400 px-3 pb-0.5 text-slate-700 font-medium">
              {isEn ? "School Seal" : "பள்ளி முத்திரை (Seal)"}
            </span>
            <span className="border-b border-dotted border-slate-400 px-3 pb-0.5 text-slate-700 font-medium">
              {isEn ? "Headmaster Signature" : "தலைமையாசிரியர் கையொப்பம் (Headmaster)"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
