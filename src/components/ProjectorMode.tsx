import React, { useState, useEffect } from "react";
import { MorningAssemblyData, LanguageMode } from "../types/assembly";
import { AssemblyPoster } from "./AssemblyPoster";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Tv,
  Layout,
  Layers,
  X,
  Volume2,
  Globe,
} from "lucide-react";

interface ProjectorModeProps {
  data: MorningAssemblyData;
  initialLanguage?: LanguageMode;
  onClose: () => void;
}

export const ProjectorMode: React.FC<ProjectorModeProps> = ({
  data,
  initialLanguage = "ta",
  onClose,
}) => {
  const [activeView, setActiveView] = useState<"poster" | "slides">("poster");
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [languageMode, setLanguageMode] = useState<LanguageMode>(initialLanguage);

  const isEn = languageMode === "en";
  const isBi = languageMode === "bilingual";

  // Toggle true browser fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!document.fullscreenElement) {
          onClose();
        }
      } else if (e.key === "ArrowRight" || e.key === "Space") {
        setSlideIndex((prev) => (prev < 8 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setSlideIndex((prev) => (prev > 0 ? prev - 1 : 8));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Read aloud helper using browser SpeechSynthesis for Tamil / English
  const speakText = (text: string, lang: string = "ta-IN") => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const slides = [
    {
      title: isEn
        ? "① 📖 THIRUKKURAL"
        : isBi
        ? "① 📖 திருக்குறள் (Thirukkural)"
        : "① 📖 திருக்குறள்",
      subtitle: isEn
        ? `Kural No: ${data.kural.number} (${data.kural.adhigaramEn ? "Chapter: " + data.kural.adhigaramEn : ""})`
        : `குறள் எண்: ${data.kural.number} (${data.kural.adhigaram ? "அதிகாரம்: " + data.kural.adhigaram : ""})`,
      content: (
        <div className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="bg-amber-50 border-4 border-amber-400 p-8 rounded-3xl shadow-lg">
            <p className="text-3xl md:text-4xl font-extrabold text-red-900 leading-relaxed font-tamil-display">
              {data.kural.line1}
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-red-900 leading-relaxed font-tamil-display mt-3">
              {data.kural.line2}
            </p>
          </div>
          <div className="bg-white/90 border-2 border-slate-300 p-6 rounded-2xl space-y-3">
            {!isEn && (
              <div>
                <span className="text-lg font-bold text-red-700 font-tamil-display block mb-1">
                  பொருள் விளக்கம்:
                </span>
                <p className="text-2xl text-slate-800 font-tamil-body leading-relaxed">
                  {data.kural.meaning}
                </p>
              </div>
            )}
            {(isEn || isBi) && data.kural.meaningEn && (
              <div className={!isEn ? "pt-3 border-t border-slate-200" : ""}>
                <span className="text-lg font-bold text-blue-700 font-sans block mb-1">
                  Couplet Meaning (English):
                </span>
                <p className="text-2xl text-slate-800 font-sans italic leading-relaxed">
                  "{data.kural.meaningEn}"
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => speakText(`${data.kural.line1} ${data.kural.line2}. பொருள்: ${data.kural.meaning}`, "ta-IN")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-base font-bold shadow-md transition-all"
            >
              <Volume2 className="w-5 h-5" /> தமிழில் வாசி (Tamil Audio)
            </button>
            {data.kural.meaningEn && (
              <button
                onClick={() => speakText(`Couplet number ${data.kural.number}. ${data.kural.meaningEn}`, "en-US")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-bold shadow-md transition-all font-sans"
              >
                <Volume2 className="w-5 h-5" /> English Audio
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn
        ? "② 🔤 VOCABULARY (ENGLISH → TAMIL)"
        : isBi
        ? "② 🔤 ENGLISH → TAMIL (சொற்களஞ்சியம்)"
        : "② 🔤 ENGLISH → TAMIL (சொற்களஞ்சியம்)",
      subtitle: isEn ? "Grade 8 Special Vocabulary" : "8-ஆம் வகுப்பு சிறப்புச் சொற்கள்",
      content: (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {data.englishWords.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white border-2 border-blue-200 px-6 py-4 rounded-2xl shadow-sm hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-9 h-9 rounded-full bg-blue-700 text-white font-black text-lg flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-2xl md:text-3xl font-extrabold text-blue-950 font-sans tracking-wide block">
                      {item.word}
                    </span>
                    {item.exampleEn && (
                      <span className="text-sm text-slate-500 font-sans italic">
                        {item.exampleEn}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-3xl font-bold text-slate-800 font-tamil-body">
                    {item.meaning}
                  </span>
                  <button
                    onClick={() => speakText(item.word, "en-US")}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Pronounce Word"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "③ 📐 CONCEPTUAL MATHEMATICS" : "③ 📐 கணித சிந்தனை",
      subtitle: isEn ? data.math.categoryEn || "Geometry & Formula Fact" : data.math.category || "கருத்து வினா",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-emerald-50 border-4 border-emerald-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-emerald-800 font-tamil-display block mb-3">
              {isEn ? "Question:" : "வினா:"}
            </span>
            <p className="text-3xl font-bold text-slate-900 leading-relaxed font-tamil-body">
              {isEn ? data.math.questionEn || data.math.question : data.math.question}
            </p>
            {isBi && data.math.questionEn && (
              <p className="text-xl text-slate-600 font-sans italic mt-2">
                ({data.math.questionEn})
              </p>
            )}
          </div>
          <div className="bg-emerald-700 text-white p-8 rounded-3xl shadow-xl border-4 border-emerald-500">
            <span className="text-xl font-bold text-emerald-200 font-tamil-display block mb-2">
              {isEn ? "Answer:" : "சரியான விடை:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              {isEn ? data.math.answerEn || data.math.answer : data.math.answer}
            </p>
            {isBi && data.math.answerEn && (
              <p className="text-2xl font-bold text-emerald-100 font-sans mt-2">
                / {data.math.answerEn}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "④ 🔬 SCIENCE GK & CONCEPTS" : "④ 🔬 அறிவியல் சிந்தனை",
      subtitle: isEn ? data.science.categoryEn || "Science GK" : data.science.category || "Science GK",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-purple-50 border-4 border-purple-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-purple-800 font-tamil-display block mb-3">
              {isEn ? "Question:" : "வினா:"}
            </span>
            <p className="text-3xl font-bold text-slate-900 leading-relaxed font-tamil-body">
              {isEn ? data.science.questionEn || data.science.question : data.science.question}
            </p>
            {isBi && data.science.questionEn && (
              <p className="text-xl text-slate-600 font-sans italic mt-2">
                ({data.science.questionEn})
              </p>
            )}
          </div>
          <div className="bg-purple-800 text-white p-8 rounded-3xl shadow-xl border-4 border-purple-500">
            <span className="text-xl font-bold text-purple-200 font-tamil-display block mb-2">
              {isEn ? "Answer:" : "விடை:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              {isEn ? data.science.answerEn || data.science.answer : data.science.answer}
            </p>
            {isBi && data.science.answerEn && (
              <p className="text-2xl font-bold text-purple-200 font-sans mt-2">
                / {data.science.answerEn}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "⑤ 🌍 SOCIAL SCIENCE" : "⑤ 🌍 சமூக அறிவியல் சிந்தனை",
      subtitle: isEn ? data.socialScience.categoryEn || "History & Civics" : data.socialScience.category || "வரலாறு & புவியியல்",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-orange-50 border-4 border-orange-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-orange-800 font-tamil-display block mb-3">
              {isEn ? "Question:" : "வினா:"}
            </span>
            <p className="text-3xl font-bold text-slate-900 leading-relaxed font-tamil-body">
              {isEn ? data.socialScience.questionEn || data.socialScience.question : data.socialScience.question}
            </p>
            {isBi && data.socialScience.questionEn && (
              <p className="text-xl text-slate-600 font-sans italic mt-2">
                ({data.socialScience.questionEn})
              </p>
            )}
          </div>
          <div className="bg-orange-700 text-white p-8 rounded-3xl shadow-xl border-4 border-orange-400">
            <span className="text-xl font-bold text-orange-200 font-tamil-display block mb-2">
              {isEn ? "Answer:" : "விடை:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              {isEn ? data.socialScience.answerEn || data.socialScience.answer : data.socialScience.answer}
            </p>
            {isBi && data.socialScience.answerEn && (
              <p className="text-2xl font-bold text-orange-100 font-sans mt-2">
                / {data.socialScience.answerEn}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "⑥ ⚽ PHYSICAL EDUCATION" : "⑥ ⚽ உடற்கல்வி சிந்தனை",
      subtitle: isEn ? data.sports.categoryEn || "Sports General Knowledge" : data.sports.category || "Sports General Knowledge",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-sky-50 border-4 border-sky-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-sky-800 font-tamil-display block mb-3">
              {isEn ? "Question:" : "வினா:"}
            </span>
            <p className="text-3xl font-bold text-slate-900 leading-relaxed font-tamil-body">
              {isEn ? data.sports.questionEn || data.sports.question : data.sports.question}
            </p>
            {isBi && data.sports.questionEn && (
              <p className="text-xl text-slate-600 font-sans italic mt-2">
                ({data.sports.questionEn})
              </p>
            )}
          </div>
          <div className="bg-sky-700 text-white p-8 rounded-3xl shadow-xl border-4 border-sky-400">
            <span className="text-xl font-bold text-sky-200 font-tamil-display block mb-2">
              {isEn ? "Answer:" : "விடை:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              {isEn ? data.sports.answerEn || data.sports.answer : data.sports.answer}
            </p>
            {isBi && data.sports.answerEn && (
              <p className="text-2xl font-bold text-sky-100 font-sans mt-2">
                / {data.sports.answerEn}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "⑦ 💡 GENERAL KNOWLEDGE" : "⑦ 💡 பொது அறிவு (General Knowledge)",
      subtitle: isEn ? data.generalKnowledge.categoryEn || "World Facts" : data.generalKnowledge.category || "உலக & இந்திய சாதனைத் தகவல்கள்",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-yellow-50 border-4 border-yellow-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-amber-800 font-tamil-display block mb-3">
              {isEn ? "Question:" : "வினா:"}
            </span>
            <p className="text-3xl font-bold text-slate-900 leading-relaxed font-tamil-body">
              {isEn ? data.generalKnowledge.questionEn || data.generalKnowledge.question : data.generalKnowledge.question}
            </p>
            {isBi && data.generalKnowledge.questionEn && (
              <p className="text-xl text-slate-600 font-sans italic mt-2">
                ({data.generalKnowledge.questionEn})
              </p>
            )}
          </div>
          <div className="bg-amber-600 text-white p-8 rounded-3xl shadow-xl border-4 border-amber-300">
            <span className="text-xl font-bold text-amber-100 font-tamil-display block mb-2">
              {isEn ? "Answer:" : "விடை:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              {isEn ? data.generalKnowledge.answerEn || data.generalKnowledge.answer : data.generalKnowledge.answer}
            </p>
            {isBi && data.generalKnowledge.answerEn && (
              <p className="text-2xl font-bold text-amber-100 font-sans mt-2">
                / {data.generalKnowledge.answerEn}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "⑧ 🔤 ABBREVIATION & EXPANSION" : "⑧ 🔤 கலைச்சொல் விரிவாக்கம் (ABBREVIATION)",
      subtitle: isEn ? "Government & Scientific Institutions" : "அரசு & கல்வி நிறுவனங்கள்",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-rose-50 border-4 border-rose-400 p-8 rounded-3xl shadow-lg space-y-4">
            <span className="inline-block bg-rose-700 text-white font-mono text-4xl md:text-5xl font-black px-6 py-2 rounded-2xl shadow-md">
              {data.abbreviation.shortForm}
            </span>
            <p className="text-3xl font-extrabold text-slate-900 font-sans tracking-wide">
              {data.abbreviation.fullForm}
            </p>
          </div>
          <div className="bg-rose-800 text-white p-6 rounded-2xl shadow-xl">
            <span className="text-lg font-bold text-rose-200 block mb-1 font-tamil-display">
              {isEn ? "Tamil Meaning:" : "தமிழ் விளக்கம்:"}
            </span>
            <p className="text-2xl font-bold font-tamil-body">
              {data.abbreviation.tamilMeaning}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: isEn ? "⑨ 🗣️ PROVERB" : "⑨ 🗣️ பழமொழி (PROVERB)",
      subtitle: isEn ? "Values & Life Wisdom" : "வாழ்வியல் நற்பண்புகள்",
      content: (
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-teal-50 border-4 border-teal-400 p-8 rounded-3xl shadow-lg">
            <span className="text-xl font-bold text-teal-800 block mb-2 font-sans">
              English Proverb:
            </span>
            <p className="text-3xl md:text-4xl font-bold italic text-slate-900 leading-relaxed font-sans">
              "{data.proverb.english}"
            </p>
          </div>
          <div className="bg-teal-700 text-white p-8 rounded-3xl shadow-xl border-4 border-teal-400">
            <span className="text-xl font-bold text-teal-200 block mb-2 font-tamil-display">
              {isEn ? "Tamil Equivalent Proverb:" : "தமிழ் இணைப் பழமொழி:"}
            </span>
            <p className="text-3xl md:text-4xl font-extrabold font-tamil-display">
              "{data.proverb.tamilEquivalent}"
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col text-white select-none">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <Tv className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-base font-bold font-tamil-display text-white">
              {isEn
                ? "Smart TV & Morning Assembly Projector View"
                : "காலை வழிபாடு காட்சி முறை (Smart TV & Projector Mode)"}
            </h2>
            <p className="text-xs text-slate-400 font-tamil-body">
              {isEn ? data.schoolNameEn || data.schoolName : data.schoolName} ·{" "}
              {isEn ? data.dayEn || data.day : data.day} ({data.date})
            </p>
          </div>
        </div>

        {/* View Toggle and Language Selector */}
        <div className="flex items-center gap-3">
          {/* Language Selector in Projector Mode */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setLanguageMode("ta")}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                languageMode === "ta" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLanguageMode("bilingual")}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                languageMode === "bilingual" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              இருமொழி
            </button>
            <button
              onClick={() => setLanguageMode("en")}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                languageMode === "en" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              English
            </button>
          </div>

          {/* View Toggle (Poster vs Slides) */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveView("poster")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "poster"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layout className="w-4 h-4" /> {isEn ? "Poster" : "சுவரொட்டி"}
            </button>
            <button
              onClick={() => setActiveView("slides")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeView === "slides"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" /> {isEn ? "Slides" : "பகுதிகள்"}
            </button>
          </div>
        </div>

        {/* Fullscreen & Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullScreen}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg transition-colors"
            title="Close Presentation Mode"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {activeView === "poster" ? (
          <div className="flex justify-center items-center h-full w-full py-4">
            <div className="scale-90 md:scale-95 origin-top shadow-2xl">
              <AssemblyPoster data={data} scale={1} languageMode={languageMode} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl h-full flex flex-col justify-between py-6">
            {/* Slide Header */}
            <div className="text-center mb-6">
              <span className="text-sm font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-4 py-1 rounded-full uppercase tracking-wider">
                {isEn ? `Section ${slideIndex + 1} / 9` : `பகுதி ${slideIndex + 1} / 9`}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mt-3 font-tamil-display">
                {slides[slideIndex].title}
              </h3>
              <p className="text-base text-slate-400 mt-1 font-tamil-body">
                {slides[slideIndex].subtitle}
              </p>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center px-4">
              {slides[slideIndex].content}
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSlideIndex((prev) => (prev > 0 ? prev - 1 : 8))}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
              >
                <ChevronLeft className="w-5 h-5" /> {isEn ? "Previous Section" : "முந்தைய பகுதி"}
              </button>

              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      i === slideIndex
                        ? "bg-emerald-500 w-8"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setSlideIndex((prev) => (prev < 8 ? prev + 1 : 0))}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/30 transition-all"
              >
                {isEn ? "Next Section" : "அடுத்த பகுதி"} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
