import React, { useState } from "react";
import { MorningAssemblyData } from "../types/assembly";
import { X, Save, School } from "lucide-react";

interface CustomizeModalProps {
  currentData: MorningAssemblyData;
  onSave: (updated: MorningAssemblyData) => void;
  onClose: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  currentData,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<MorningAssemblyData>(JSON.parse(JSON.stringify(currentData)));
  const [activeTab, setActiveTab] = useState<"general" | "kural" | "vocab" | "qa">("general");

  const handleGeneralChange = (field: keyof MorningAssemblyData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleKuralChange = (field: keyof typeof currentData.kural, val: any) => {
    setFormData((prev) => ({
      ...prev,
      kural: { ...prev.kural, [field]: val },
    }));
  };

  const handleWordChange = (idx: number, field: "word" | "meaning" | "exampleEn", val: string) => {
    setFormData((prev) => {
      const words = [...prev.englishWords];
      words[idx] = { ...words[idx], [field]: val };
      return { ...prev, englishWords: words };
    });
  };

  const handleQAChange = (
    section: "math" | "science" | "socialScience" | "sports" | "generalKnowledge",
    field: "question" | "answer" | "questionEn" | "answerEn",
    val: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: val },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-800 to-amber-800 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <School className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="text-lg font-bold font-tamil-display">
                சுவரொட்டி தகவல்களைத் திருத்து (Customize Poster - Tamil & English)
              </h2>
              <p className="text-xs text-amber-100 font-tamil-body">
                பள்ளிப் பெயர், நாள், தேதி மற்றும் வினாக்களை விருப்பப்படி மாற்றி அமைக்கலாம் (Both Tamil & English)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors font-tamil-display ${
              activeTab === "general"
                ? "bg-white text-red-900 border-t-2 border-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🏫 பள்ளி & தேதி (General)
          </button>
          <button
            onClick={() => setActiveTab("kural")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors font-tamil-display ${
              activeTab === "kural"
                ? "bg-white text-red-900 border-t-2 border-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ① திருக்குறள் (Kural)
          </button>
          <button
            onClick={() => setActiveTab("vocab")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors font-tamil-display ${
              activeTab === "vocab"
                ? "bg-white text-red-900 border-t-2 border-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ② ஆங்கிலச் சொற்கள் (Vocab)
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors font-tamil-display ${
              activeTab === "qa"
                ? "bg-white text-red-900 border-t-2 border-red-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ③-⑨ வினா-விடை (Q&A Dual)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 font-tamil-body text-slate-800 text-xs">
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    பள்ளியின் பெயர் (Tamil):
                  </label>
                  <input
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => handleGeneralChange("schoolName", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                    placeholder="அரசு உயர்நிலைப்பள்ளி, சிறுமதுரை"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1 font-sans">
                    School Name (English):
                  </label>
                  <input
                    type="text"
                    value={formData.schoolNameEn || ""}
                    onChange={(e) => handleGeneralChange("schoolNameEn", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-sans font-bold"
                    placeholder="Govt High School, Sirumadurai"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    கிழமை / நாள் (Tamil):
                  </label>
                  <input
                    type="text"
                    value={formData.day}
                    onChange={(e) => handleGeneralChange("day", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="வியாழக்கிழமை"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1 font-sans">
                    Day (English):
                  </label>
                  <input
                    type="text"
                    value={formData.dayEn || ""}
                    onChange={(e) => handleGeneralChange("dayEn", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-sans"
                    placeholder="Thursday"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    தேதி (Date):
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => handleGeneralChange("date", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="22-10-2026"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    துறை தலைப்பு (Tamil):
                  </label>
                  <input
                    type="text"
                    value={formData.schoolSubtext || ""}
                    onChange={(e) => handleGeneralChange("schoolSubtext", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    placeholder="பள்ளி கல்வித்துறை, தமிழ்நாடு அரசு"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1 font-sans">
                    Department (English):
                  </label>
                  <input
                    type="text"
                    value={formData.schoolSubtextEn || ""}
                    onChange={(e) => handleGeneralChange("schoolSubtextEn", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-sans"
                    placeholder="Department of School Education, Govt of Tamil Nadu"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      மேற்கோள் 1 (Tamil):
                    </label>
                    <input
                      type="text"
                      value={formData.footerQuote1}
                      onChange={(e) => handleGeneralChange("footerQuote1", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1 font-sans">
                      Quote 1 (English):
                    </label>
                    <input
                      type="text"
                      value={formData.footerQuote1En || ""}
                      onChange={(e) => handleGeneralChange("footerQuote1En", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      மேற்கோள் 2 (Tamil):
                    </label>
                    <input
                      type="text"
                      value={formData.footerQuote2}
                      onChange={(e) => handleGeneralChange("footerQuote2", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1 font-sans">
                      Quote 2 (English):
                    </label>
                    <input
                      type="text"
                      value={formData.footerQuote2En || ""}
                      onChange={(e) => handleGeneralChange("footerQuote2En", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-sans"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "kural" && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    குறள் எண் (Kural Number):
                  </label>
                  <input
                    type="number"
                    value={formData.kural.number}
                    onChange={(e) => handleKuralChange("number", parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                    min="1"
                    max="1330"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    அதிகாரம் (Tamil):
                  </label>
                  <input
                    type="text"
                    value={formData.kural.adhigaram || ""}
                    onChange={(e) => handleKuralChange("adhigaram", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    placeholder="கல்வி"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1 font-sans">
                    Chapter (English):
                  </label>
                  <input
                    type="text"
                    value={formData.kural.adhigaramEn || ""}
                    onChange={(e) => handleKuralChange("adhigaramEn", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-sans"
                    placeholder="Learning"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  முதல் அடி (Line 1 - 4 சீர்கள்):
                </label>
                <input
                  type="text"
                  value={formData.kural.line1}
                  onChange={(e) => handleKuralChange("line1", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-tamil-display text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  இரண்டாம் அடி (Line 2 - 3 சீர்கள்):
                </label>
                <input
                  type="text"
                  value={formData.kural.line2}
                  onChange={(e) => handleKuralChange("line2", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-tamil-display text-sm font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  எளிய தமிழ் பொருள் (Tamil Meaning):
                </label>
                <textarea
                  rows={2}
                  value={formData.kural.meaning}
                  onChange={(e) => handleKuralChange("meaning", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 font-sans">
                  English Couplet Translation (English Meaning):
                </label>
                <textarea
                  rows={2}
                  value={formData.kural.meaningEn || ""}
                  onChange={(e) => handleKuralChange("meaningEn", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-sans italic leading-relaxed"
                  placeholder="Learn thoroughly whatever is worth learning..."
                />
              </div>
            </div>
          )}

          {activeTab === "vocab" && (
            <div className="space-y-3">
              <p className="text-xs text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-200">
                8-ஆம் வகுப்பு மாணவர்களுக்கான 5 ஆங்கிலச் சொற்கள் (English Words, Tamil Meanings & Short Definitions):
              </p>
              {formData.englishWords.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5 font-sans">
                      {idx + 1}. English Word:
                    </label>
                    <input
                      type="text"
                      value={item.word}
                      onChange={(e) => handleWordChange(idx, "word", e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-semibold focus:ring-1 focus:ring-blue-600 font-sans"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                      தமிழ் அர்த்தம் (Tamil):
                    </label>
                    <input
                      type="text"
                      value={item.meaning}
                      onChange={(e) => handleWordChange(idx, "meaning", e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-semibold focus:ring-1 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5 font-sans">
                      Definition / Example (English):
                    </label>
                    <input
                      type="text"
                      value={item.exampleEn || ""}
                      onChange={(e) => handleWordChange(idx, "exampleEn", e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-sans text-xs italic"
                      placeholder="Short meaning in English"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "qa" && (
            <div className="space-y-4">
              {/* Math */}
              <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 space-y-1.5">
                <span className="font-bold text-emerald-900 block">③ 📐 கணித சிந்தனை (Conceptual Math)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.math.question}
                    onChange={(e) => handleQAChange("math", "question", e.target.value)}
                    className="w-full px-2 py-1 border border-emerald-300 rounded text-xs"
                    placeholder="வினா (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.math.questionEn || ""}
                    onChange={(e) => handleQAChange("math", "questionEn", e.target.value)}
                    className="w-full px-2 py-1 border border-emerald-300 rounded text-xs font-sans"
                    placeholder="Question (English)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.math.answer}
                    onChange={(e) => handleQAChange("math", "answer", e.target.value)}
                    className="w-full px-2 py-1 border border-emerald-300 rounded font-bold text-emerald-950 text-xs"
                    placeholder="விடை (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.math.answerEn || ""}
                    onChange={(e) => handleQAChange("math", "answerEn", e.target.value)}
                    className="w-full px-2 py-1 border border-emerald-300 rounded font-bold text-emerald-950 text-xs font-sans"
                    placeholder="Answer (English)"
                  />
                </div>
              </div>

              {/* Science */}
              <div className="bg-purple-50/60 p-3 rounded-lg border border-purple-200 space-y-1.5">
                <span className="font-bold text-purple-900 block">④ 🔬 அறிவியல் சிந்தனை (Science GK)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.science.question}
                    onChange={(e) => handleQAChange("science", "question", e.target.value)}
                    className="w-full px-2 py-1 border border-purple-300 rounded text-xs"
                    placeholder="வினா (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.science.questionEn || ""}
                    onChange={(e) => handleQAChange("science", "questionEn", e.target.value)}
                    className="w-full px-2 py-1 border border-purple-300 rounded text-xs font-sans"
                    placeholder="Question (English)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.science.answer}
                    onChange={(e) => handleQAChange("science", "answer", e.target.value)}
                    className="w-full px-2 py-1 border border-purple-300 rounded font-bold text-purple-950 text-xs"
                    placeholder="விடை (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.science.answerEn || ""}
                    onChange={(e) => handleQAChange("science", "answerEn", e.target.value)}
                    className="w-full px-2 py-1 border border-purple-300 rounded font-bold text-purple-950 text-xs font-sans"
                    placeholder="Answer (English)"
                  />
                </div>
              </div>

              {/* Social Science */}
              <div className="bg-orange-50/60 p-3 rounded-lg border border-orange-200 space-y-1.5">
                <span className="font-bold text-orange-900 block">⑤ 🌍 சமூக அறிவியல் சிந்தனை (Social Science)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.socialScience.question}
                    onChange={(e) => handleQAChange("socialScience", "question", e.target.value)}
                    className="w-full px-2 py-1 border border-orange-300 rounded text-xs"
                    placeholder="வினா (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.socialScience.questionEn || ""}
                    onChange={(e) => handleQAChange("socialScience", "questionEn", e.target.value)}
                    className="w-full px-2 py-1 border border-orange-300 rounded text-xs font-sans"
                    placeholder="Question (English)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.socialScience.answer}
                    onChange={(e) => handleQAChange("socialScience", "answer", e.target.value)}
                    className="w-full px-2 py-1 border border-orange-300 rounded font-bold text-orange-950 text-xs"
                    placeholder="விடை (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.socialScience.answerEn || ""}
                    onChange={(e) => handleQAChange("socialScience", "answerEn", e.target.value)}
                    className="w-full px-2 py-1 border border-orange-300 rounded font-bold text-orange-950 text-xs font-sans"
                    placeholder="Answer (English)"
                  />
                </div>
              </div>

              {/* Sports */}
              <div className="bg-sky-50/60 p-3 rounded-lg border border-sky-200 space-y-1.5">
                <span className="font-bold text-sky-900 block">⑥ ⚽ உடற்கல்வி சிந்தனை (Sports GK)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.sports.question}
                    onChange={(e) => handleQAChange("sports", "question", e.target.value)}
                    className="w-full px-2 py-1 border border-sky-300 rounded text-xs"
                    placeholder="வினா (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.sports.questionEn || ""}
                    onChange={(e) => handleQAChange("sports", "questionEn", e.target.value)}
                    className="w-full px-2 py-1 border border-sky-300 rounded text-xs font-sans"
                    placeholder="Question (English)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.sports.answer}
                    onChange={(e) => handleQAChange("sports", "answer", e.target.value)}
                    className="w-full px-2 py-1 border border-sky-300 rounded font-bold text-sky-950 text-xs"
                    placeholder="விடை (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.sports.answerEn || ""}
                    onChange={(e) => handleQAChange("sports", "answerEn", e.target.value)}
                    className="w-full px-2 py-1 border border-sky-300 rounded font-bold text-sky-950 text-xs font-sans"
                    placeholder="Answer (English)"
                  />
                </div>
              </div>

              {/* GK */}
              <div className="bg-yellow-50/60 p-3 rounded-lg border border-yellow-200 space-y-1.5">
                <span className="font-bold text-yellow-950 block">⑦ 💡 பொது அறிவு (General Knowledge)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.generalKnowledge.question}
                    onChange={(e) => handleQAChange("generalKnowledge", "question", e.target.value)}
                    className="w-full px-2 py-1 border border-yellow-300 rounded text-xs"
                    placeholder="வினா (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.generalKnowledge.questionEn || ""}
                    onChange={(e) => handleQAChange("generalKnowledge", "questionEn", e.target.value)}
                    className="w-full px-2 py-1 border border-yellow-300 rounded text-xs font-sans"
                    placeholder="Question (English)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.generalKnowledge.answer}
                    onChange={(e) => handleQAChange("generalKnowledge", "answer", e.target.value)}
                    className="w-full px-2 py-1 border border-yellow-300 rounded font-bold text-amber-950 text-xs"
                    placeholder="விடை (Tamil)"
                  />
                  <input
                    type="text"
                    value={formData.generalKnowledge.answerEn || ""}
                    onChange={(e) => handleQAChange("generalKnowledge", "answerEn", e.target.value)}
                    className="w-full px-2 py-1 border border-yellow-300 rounded font-bold text-amber-950 text-xs font-sans"
                    placeholder="Answer (English)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-semibold transition-colors"
            >
              ரத்து செய் (Cancel)
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" /> சேமித்து சுவரொட்டியை புதுப்பி (Save)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
