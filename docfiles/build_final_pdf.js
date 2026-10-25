const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const htmlPath = path.resolve(__dirname, "metabolic_switching_evidence_brief.html");
const publicPdfPath = path.resolve(__dirname, "..", "public", "documents", "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf");
const docfilePdfPath = path.resolve(__dirname, "Liberty_Science_Metabolic_Switching_Diet_Plan.pdf");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Chrome headless flags for ultra-crisp, publication-grade vector PDF:
const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf-no-header --print-to-pdf="${publicPdfPath}" "${htmlPath}"`;

console.log("Generating publication-grade clinical PDF...");
try {
  execSync(cmd);
  fs.copyFileSync(publicPdfPath, docfilePdfPath);
  
  const stats = fs.statSync(publicPdfPath);
  console.log("SUCCESS! PDF Generated cleanly.");
  console.log("Target 1 (Public URL):", publicPdfPath);
  console.log("Target 2 (Docfiles):", docfilePdfPath);
  console.log("File Size:", stats.size, "bytes");
} catch (err) {
  console.error("PDF generation failed:", err);
}
