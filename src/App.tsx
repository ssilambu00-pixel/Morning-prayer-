import React, { useState, useRef, useEffect } from "react";
import { MorningAssemblyData, LanguageMode } from "./types/assembly";
import { CURATED_ASSEMBLIES } from "./data/curatedAssemblies";
import { AssemblyPoster } from "./components/AssemblyPoster";
import { ProjectorMode } from "./components/ProjectorMode";
import { CustomizeModal } from "./components/CustomizeModal";
import { GenerateModal } from "./components/GenerateModal";
import { exportPosterToPDF, exportAllPostersToPDF } from "./utils/pdfExport";
import {
  Printer,
  Download,
  Tv,
  Edit3,
  Sparkles,
  Calendar,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  FileText,
  Globe,
} from "lucide-react";

export default function App() {
  const [assemblies, setAssemblies] = useState<MorningAssemblyData[]>(() => {
    const saved = localStorage.getItem("tamil_assemblies_v1");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return CURATED_ASSEMBLIES;
      }
    }
    return CURATED_ASSEMBLIES;
  });

  const [activeId, setActiveId] = useState<string>(() => assemblies[0]?.id || "day-1");
  const [zoomScale, setZoomScale] = useState<number>(0.92);
  const [languageMode, setLanguageMode] = useState<LanguageMode>("ta");
  const [isProjectorOpen, setIsProjectorOpen] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [exportStatusText, setExportStatusText] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const posterRef = useRef<HTMLDivElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("tamil_assemblies_v1", JSON.stringify(assemblies));
  }, [assemblies]);

  const activeAssembly =
    assemblies.find((a) => a.id === activeId) || assemblies[0] || CURATED_ASSEMBLIES[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isEn = languageMode === "en";
  const isBi = languageMode === "bilingual";

  // 1-Click Single Poster PDF Download
  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    setExportStatusText(
      isEn
        ? "Generating high-resolution A4 PDF document..."
        : "சுவரொட்டி பிடிஎப் (PDF) ஆவணமாக மாற்றப்படுகிறது..."
    );
    try {
      const langSuffix = isEn ? "English" : isBi ? "Bilingual" : "Tamil";
      const fileName = `Morning_Assembly_${activeAssembly.date}_${langSuffix}.pdf`;
      await exportPosterToPDF("a4-poster-root", fileName, (msg) => {
        setExportStatusText(msg);
      });
      showToast(
        isEn
          ? "PDF downloaded successfully! ✓"
          : "பிடிஎப் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது! ✓"
      );
    } catch (err: any) {
      console.error(err);
      alert(
        isEn
          ? "Error generating PDF: " + err.message
          : "பிடிஎப் உருவாக்குவதில் சிக்கல் ஏற்பட்டது: " + err.message
      );
    } finally {
      setIsExportingPDF(false);
      setExportStatusText("");
    }
  };

  // Batch Export All Days to Multi-Page PDF ("அதை அத்தனையும் பிடிஎப் வடிவில் தரவும்")
  const handleBatchExportPDF = async () => {
    setIsExportingPDF(true);
    setExportStatusText(
      isEn
        ? "Preparing multi-page morning assembly PDF booklet..."
        : "அனைத்து நாட்களுக்கான பிடிஎப் புத்தகம் தயாராகிறது..."
    );
    try {
      await exportAllPostersToPDF(assemblies, "batch-render-area", (_curr, _tot, msg) => {
        setExportStatusText(msg);
      });
      showToast(
        isEn
          ? "All posters PDF booklet downloaded successfully! ✓"
          : "அனைத்து நாட்களின் பிடிஎப் தொகுப்பு பதிவிறக்கம் செய்யப்பட்டது! ✓"
      );
    } catch (err: any) {
      console.error(err);
      alert(
        isEn
          ? "Error generating booklet PDF: " + err.message
          : "தொகுப்பு பிடிஎப் உருவாக்குவதில் பிழை ஏற்பட்டது: " + err.message
      );
    } finally {
      setIsExportingPDF(false);
      setExportStatusText("");
    }
  };

  // Browser Native Print
  const handlePrint = () => {
    window.print();
  };

  // Save customized data
  const handleSaveCustomized = (updated: MorningAssemblyData) => {
    setAssemblies((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    showToast(
      isEn
        ? "Poster customized changes saved! ✓"
        : "சுவரொட்டி மாற்றங்கள் சேமிக்கப்பட்டன! ✓"
    );
  };

  // Add newly generated assembly from Gemini API
  const handleNewGenerated = (newData: MorningAssemblyData) => {
    setAssemblies((prev) => [newData, ...prev]);
    setActiveId(newData.id);
    showToast(
      isEn
        ? "New day morning assembly poster generated! ✓"
        : "புதிய நாளுக்கான வழிபாட்டுச் சுவரொட்டி தயாராகிவிட்டது! ✓"
    );
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col">
      {/* ======================= TOP BAR CONTRACT ======================= */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            className="text-base md:text-lg font-bold tracking-tight text-red-900 whitespace-nowrap shrink-0 font-tamil-display flex items-center gap-2"
          >
            <span>🏫</span>
            <span>
              {isEn
                ? "Govt School Morning Assembly Poster"
                : isBi
                ? "அரசுப் பள்ளி காலை வழிபாடு (Bilingual)"
                : "அரசுப் பள்ளி காலை வழிபாட்டுச் சுவரொட்டி"}
            </span>
          </a>

          {/* Zone 2: Clean single-line nav actions + Language Selector */}
          <nav className="flex items-center gap-4 text-xs md:text-sm font-medium text-slate-700 font-tamil-body">
            {/* Language Switcher Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg shrink-0">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 shrink-0" />
              <button
                onClick={() => setLanguageMode("ta")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  languageMode === "ta"
                    ? "bg-white text-red-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLanguageMode("bilingual")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  languageMode === "bilingual"
                    ? "bg-white text-red-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                இருமொழி (Bilingual)
              </button>
              <button
                onClick={() => setLanguageMode("en")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  languageMode === "en"
                    ? "bg-white text-red-900 shadow-xs font-bold font-sans"
                    : "text-slate-600 hover:text-slate-900 font-sans"
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={() => setIsProjectorOpen(true)}
              className="hidden md:flex hover:text-red-800 transition-colors whitespace-nowrap shrink-0 items-center gap-1.5"
            >
              <Tv className="w-4 h-4 text-emerald-600" />
              <span>{isEn ? "Smart TV / Projector" : "ஸ்மார்ட் டிவி / புரொஜக்டர்"}</span>
            </button>
            <button
              onClick={handleBatchExportPDF}
              className="hidden lg:flex hover:text-red-800 transition-colors whitespace-nowrap shrink-0 items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>{isEn ? "Export All (PDF Booklet)" : "அனைத்தையும் பிடிஎப் ஆக்குக"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden md:flex hover:text-red-800 transition-colors whitespace-nowrap shrink-0 items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{isEn ? "Print" : "அச்சிடுக"}</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsGenerateOpen(true)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-red-800 hover:bg-red-900 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 font-tamil-display"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEn ? "Generate New Day" : "புதிய நாள் உருவாக்கு"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================= DAY SELECTOR BAR ======================= */}
      <section
        id="archive-strip"
        className="no-print bg-white border-b border-slate-200 px-4 py-2.5 shadow-2xs"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider font-tamil-display flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-red-700" />
              <span>{isEn ? "Calendar Archive:" : "நாள்காட்டி வரிசை:"}</span>
            </span>
          </div>

          {/* Interactive Date Carousel Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none flex-1">
            {assemblies.map((item, index) => {
              const isActive = item.id === activeId;
              const displayDay = isEn ? item.dayEn || item.day : item.day;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all font-tamil-body flex items-center gap-2 ${
                    isActive
                      ? "bg-red-800 text-white shadow-xs scale-102"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isActive ? "bg-amber-400 text-red-950" : "bg-slate-300 text-slate-700"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{displayDay}</span>
                  <span className={`text-[10px] ${isActive ? "text-amber-200" : "text-slate-500"}`}>
                    ({item.date})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Add Day */}
          <button
            onClick={() => setIsGenerateOpen(true)}
            className="px-2.5 py-1 text-xs font-bold text-red-800 hover:bg-red-50 border border-dashed border-red-300 rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1 font-tamil-body"
          >
            {isEn ? "+ Add Day" : "+ அடுத்த நாள்"}
          </button>
        </div>
      </section>

      {/* ======================= ACTION TOOLBAR ======================= */}
      <section className="no-print bg-slate-50 border-b border-slate-200 py-2.5 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Active poster info */}
          <div className="flex items-center gap-2 text-xs font-tamil-body text-slate-700">
            <span className="font-bold text-slate-900">
              {isEn ? activeAssembly.schoolNameEn || activeAssembly.schoolName : activeAssembly.schoolName}
            </span>
            <span>·</span>
            <span className="font-semibold text-blue-800">
              {isEn ? activeAssembly.dayEn || activeAssembly.day : activeAssembly.day}
            </span>
            <span>·</span>
            <span className="text-slate-600">{activeAssembly.date}</span>
            <span>·</span>
            <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px] border border-amber-300">
              {isEn ? `Kural ${activeAssembly.kural.number}` : `குறள் ${activeAssembly.kural.number}`}
            </span>
          </div>

          {/* Main Action Buttons */}
          <div className="flex items-center gap-2 font-tamil-body">
            {/* Download PDF button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
              title="A4 Print-Ready PDF Download"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? "Download PDF (A4)" : "பிடிஎப் பதிவிறக்கு (A4 PDF)"}</span>
            </button>

            {/* Direct Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isEn ? "Print" : "அச்சிடு"}</span>
            </button>

            {/* Smart TV / Projector Mode */}
            <button
              onClick={() => setIsProjectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              title="Classroom Smart TV & Morning Assembly Projector"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>{isEn ? "Smart TV Mode" : "ஸ்மார்ட் டிவி முறை"}</span>
            </button>

            {/* Customize / Edit */}
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
              title="Edit School Name or Section Details"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? "Edit" : "திருத்து"}</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden lg:flex items-center gap-1 border-l border-slate-300 pl-2 ml-1 text-slate-600">
              <button
                onClick={() => setZoomScale((prev) => Math.max(0.65, prev - 0.08))}
                className="p-1 hover:bg-slate-200 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono w-10 text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((prev) => Math.min(1.2, prev + 0.08))}
                className="p-1 hover:bg-slate-200 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomScale(0.92)}
                className="p-1 hover:bg-slate-200 rounded text-slate-500"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Progress or Export Overlay */}
      {isExportingPDF && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl space-y-3">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-base font-bold text-slate-900 font-tamil-display">
              {isEn ? "Generating PDF Document..." : "பிடிஎப் உருவாக்கப்படுகிறது..."}
            </h3>
            <p className="text-xs text-slate-600 font-tamil-body leading-relaxed">
              {exportStatusText ||
                (isEn
                  ? "Rendering 300 DPI print-ready document. Please wait a moment..."
                  : "உயர் தெளிவுத்திறனில் (300 DPI) ஆவணம் தயாராகிறது. சிறிது நேரம் காத்திருக்கவும்...")}
            </p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-fade-in font-tamil-body text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ======================= POSTER DISPLAY WORKSPACE ======================= */}
      <main className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        {/* Printable/Displayable Container */}
        <div className="flex flex-col items-center">
          <div
            style={{
              width: `${794 * zoomScale}px`,
              height: `${1123 * zoomScale}px`,
              overflow: "hidden",
            }}
            className="flex justify-center items-start transition-all duration-150"
          >
            <AssemblyPoster
              innerRef={posterRef}
              data={activeAssembly}
              scale={zoomScale}
              languageMode={languageMode}
              onEditField={() => setIsCustomizeOpen(true)}
            />
          </div>

          {/* Quick Helper caption under poster */}
          <div className="no-print mt-4 text-center text-xs text-slate-500 font-tamil-body space-y-1">
            <p>
              {isEn
                ? "💡 A4 Portrait (210mm × 297mm) · 300 DPI Print Quality · Ideal for Classroom Smart TV, Notice Board & Projector"
                : "💡 A4 Portrait அளவு (210mm × 297mm) · 300 DPI அச்சுத் தரம் · வகுப்பறை & கூட்ட அரங்க அறிவிப்புப் பலகைக்கு ஏற்றது"}
            </p>
            <p className="text-slate-400 text-[11px]">
              {isEn
                ? "Switch language mode to English, Tamil, or Bilingual via the top bar."
                : "மேல் பட்டியில் உள்ள 'தமிழ் | இருமொழி | English' மூலம் மொழி அமைப்பை மாற்றிக் கொள்ளலாம்."}
            </p>
          </div>
        </div>
      </main>

      {/* ======================= HIDDEN BATCH RENDER AREA FOR MULTI-PAGE PDF BOOKLET ======================= */}
      <div
        id="batch-render-area"
        className="fixed -left-[9999px] top-0 pointer-events-none opacity-0"
        aria-hidden="true"
      >
        {assemblies.map((item) => (
          <div key={item.id} id={`batch-poster-${item.id}`}>
            <AssemblyPoster data={item} isPrintPreview scale={1} languageMode={languageMode} />
          </div>
        ))}
      </div>

      {/* ======================= MODALS ======================= */}
      {isProjectorOpen && (
        <ProjectorMode
          data={activeAssembly}
          initialLanguage={languageMode}
          onClose={() => setIsProjectorOpen(false)}
        />
      )}

      {isCustomizeOpen && (
        <CustomizeModal
          currentData={activeAssembly}
          onSave={handleSaveCustomized}
          onClose={() => setIsCustomizeOpen(false)}
        />
      )}

      {isGenerateOpen && (
        <GenerateModal
          schoolName={activeAssembly.schoolName}
          existingKurals={assemblies.map((a) => a.kural.number)}
          onGenerated={handleNewGenerated}
          onClose={() => setIsGenerateOpen(false)}
        />
      )}
    </div>
  );
}
