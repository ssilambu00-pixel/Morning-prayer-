import React, { useState } from "react";
import { MorningAssemblyData } from "../types/assembly";
import { Sparkles, Calendar, School, Loader2, X, AlertCircle } from "lucide-react";

interface GenerateModalProps {
  schoolName: string;
  existingKurals: number[];
  onGenerated: (newData: MorningAssemblyData) => void;
  onClose: () => void;
}

export const GenerateModal: React.FC<GenerateModalProps> = ({
  schoolName,
  existingKurals,
  onGenerated,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [customSchoolName, setCustomSchoolName] = useState(schoolName);
  const [customSchoolNameEn, setCustomSchoolNameEn] = useState("Govt High School, Sirumadurai");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Compute Tamil and English day name from date string
  const getDayNames = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayIndex = d.getDay();
    const tamilDays = [
      "ஞாயிற்றுக்கிழமை",
      "திங்கட்கிழமை",
      "செவ்வாய்க்கிழமை",
      "புதன்கிழமை",
      "வியாழக்கிழமை",
      "வெள்ளிக்கிழமை",
      "சனிக்கிழமை",
    ];
    const englishDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return {
      tamil: tamilDays[dayIndex] || "திங்கட்கிழமை",
      english: englishDays[dayIndex] || "Monday",
    };
  };

  const formattedDateForTamil = (dateStr: string) => {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const dayInfo = getDayNames(selectedDate);
    const formattedDate = formattedDateForTamil(selectedDate);

    try {
      const response = await fetch("/api/generate-assembly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          day: dayInfo.tamil,
          dayEn: dayInfo.english,
          schoolName: customSchoolName,
          schoolNameEn: customSchoolNameEn,
          excludeKurals: existingKurals,
        }),
      });

      const resData = await response.json();
      if (!resData.success || !resData.data) {
        throw new Error(resData.error || "Generation failed. Please try again.");
      }

      const raw = resData.data;
      const newAssembly: MorningAssemblyData = {
        id: `ai-${Date.now()}`,
        date: formattedDate,
        day: dayInfo.tamil,
        dayEn: dayInfo.english,
        schoolName: customSchoolName,
        schoolNameEn: customSchoolNameEn,
        schoolSubtext: "பள்ளி கல்வித்துறை, தமிழ்நாடு அரசு",
        schoolSubtextEn: "Department of School Education, Govt of Tamil Nadu",
        academicYear: "2026 - 2027",
        kural: {
          number: raw.kural.number,
          adhigaram: raw.kural.adhigaram,
          adhigaramEn: raw.kural.adhigaramEn,
          line1: raw.kural.line1,
          line2: raw.kural.line2,
          meaning: raw.kural.meaning,
          meaningEn: raw.kural.meaningEn,
        },
        englishWords: raw.englishWords.slice(0, 5),
        math: raw.math,
        science: raw.science,
        socialScience: raw.socialScience,
        sports: raw.sports,
        generalKnowledge: raw.generalKnowledge,
        abbreviation: raw.abbreviation,
        proverb: raw.proverb,
        footerQuote1: "இன்று கற்ற ஒரு வரி — நாளை உங்கள் வெற்றிக்கு வழி!",
        footerQuote1En: raw.footerQuote1En || "A line learned today paves the path to tomorrow's victory!",
        footerQuote2: "ஒழுக்கம் உடைய மாணவர் — உயர்வை அடைவார்!",
        footerQuote2En: raw.footerQuote2En || "A student with discipline achieves true excellence!",
      };

      onGenerated(newAssembly);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "சுவரொட்டி உருவாக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const dayInfo = getDayNames(selectedDate);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold font-tamil-display">
              புதிய நாள் சுவரொட்டி உருவாக்கு (Generate - Dual Language)
            </h2>
          </div>
          <button onClick={onClose} disabled={isLoading} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-4 font-tamil-body text-xs text-slate-800">
          <p className="text-slate-600 leading-relaxed">
            தேர்ந்தெடுக்கும் நாளுக்கான 9 பகுதிகளும் தமிழ் மற்றும் ஆங்கிலம் ஆகிய இருமொழிகளிலும் (Bilingual / Tamil & English) பாடத்திட்ட நெறிமுறைகளின்படி உருவாக்கப்படும்.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                பள்ளிப் பெயர் (Tamil):
              </label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus-within:border-blue-600 focus-within:bg-white">
                <School className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={customSchoolName}
                  onChange={(e) => setCustomSchoolName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1 font-sans">
                School Name (English):
              </label>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus-within:border-blue-600 focus-within:bg-white">
                <School className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={customSchoolNameEn}
                  onChange={(e) => setCustomSchoolNameEn(e.target.value)}
                  className="w-full bg-transparent focus:outline-none font-bold text-slate-900 font-sans"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              தேதி தேர்வு செய்யவும் (Select Date):
            </label>
            <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus-within:border-blue-600 focus-within:bg-white">
              <Calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent focus:outline-none font-bold text-slate-900"
                required
              />
            </div>
            <p className="text-[11px] text-blue-700 font-semibold mt-1">
              தேர்ந்தெடுத்த கிழமை: <span className="underline">{dayInfo.tamil}</span> ({dayInfo.english})
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="text-xs">{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-semibold transition-colors"
            >
              ரத்து செய் (Cancel)
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold shadow-md transition-colors disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  சுவரொட்டி தயாராகிறது...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  சுவரொட்டி உருவாக்கு (Generate)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
