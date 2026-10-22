import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MorningAssemblyData } from "../types/assembly";

/**
 * Downloads a single Morning Assembly poster as a print-ready A4 PDF
 */
export async function exportPosterToPDF(
  elementId: string,
  fileName: string = "Tamil_Morning_Assembly.pdf",
  onProgress?: (progressText: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  onProgress?.("உயர் தரத்தில் சுவரொட்டி தயாராகிறது (Rendering high-res)...");

  // Save original styles
  const originalTransform = element.style.transform;
  element.style.transform = "none";

  try {
    // Render high-res canvas at 2x or 3x scale for crisp print quality
    const canvas = await html2canvas(element, {
      scale: 3, // High DPI (crisp Tamil font rendering)
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 794,
      windowHeight: 1123,
    });

    onProgress?.("பிடிஎப் (PDF) ஆவணமாக மாற்றப்படுகிறது...");

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

    onProgress?.("பதிவிறக்கம் தொடங்குகிறது...");
    pdf.save(fileName);
  } finally {
    element.style.transform = originalTransform;
  }
}

/**
 * Batch export multiple posters into a single comprehensive multi-page PDF booklet
 */
export async function exportAllPostersToPDF(
  assemblies: MorningAssemblyData[],
  renderContainerId: string,
  onProgress?: (current: number, total: number, message: string) => void
): Promise<void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const total = assemblies.length;

  for (let i = 0; i < total; i++) {
    const item = assemblies[i];
    onProgress?.(i + 1, total, `பக்கம் ${i + 1}/${total}: ${item.day} (${item.date}) தயாராகிறது...`);

    // We locate the container rendered for this item
    const el = document.getElementById(`batch-poster-${item.id}`);
    if (el) {
      const originalTransform = el.style.transform;
      el.style.transform = "none";

      const canvas = await html2canvas(el, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      el.style.transform = originalTransform;

      if (i > 0) {
        pdf.addPage("a4", "portrait");
      }

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }
  }

  onProgress?.(total, total, "அனைத்துப் பக்கங்களும் இணைக்கப்பட்டு பதிவிறக்கம் செய்யப்படுகிறது...");
  pdf.save(`காலை_வழிபாட்டு_தொகுப்பு_${new Date().toISOString().slice(0, 10)}.pdf`);
}
