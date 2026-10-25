const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const htmlPath = path.resolve(__dirname, "habit_plan_document.html");
const publicPdfPath = path.resolve(__dirname, "..", "public", "documents", "Liberty_Science_6Day_Habit_Plan.pdf");
const docfilePdfPath = path.resolve(__dirname, "Liberty_Science_6Day_Habit_Plan.pdf");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const cmd = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${publicPdfPath}" "${htmlPath}"`;

console.log("Generating 6-Day Habit Plan PDF...");
try {
  execSync(cmd);
  fs.copyFileSync(publicPdfPath, docfilePdfPath);
  const stats = fs.statSync(publicPdfPath);
  console.log("SUCCESS! Generated 6-Day Habit Plan PDF.");
  console.log("Size:", stats.size, "bytes");
} catch (e) {
  console.error("Error:", e);
}
