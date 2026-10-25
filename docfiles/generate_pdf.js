const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: 'Times New Roman', serif; color: #0F172A; line-height: 1.6; }
    .header { border-bottom: 2px solid #b45309; padding-bottom: 12px; margin-bottom: 24px; }
    h1 { color: #1e293b; font-size: 24px; margin: 0 0 6px 0; }
    .meta { font-family: monospace; font-size: 11px; color: #b45309; text-transform: uppercase; letter-spacing: 1px; }
    p { font-size: 14px; color: #334155; }
    .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="meta">Liberty Science Coaching • Executive Clinical Series</div>
    <h1>Metabolic Neuroplasticity Protocol & Clinical Diet Plan</h1>
    <div class="badge">Healthcare Taxonomy: 71400000X • Tucson, AZ</div>
  </div>
  <p><strong>Chief Clinician:</strong> Vera Shury, MS (ACE Health Coach, HeartMath Practitioner, PWR!Moves Certified)</p>
  <p>This protocol integrates cyclic metabolic switching, HeartMath 0.10 Hz coherence, and mitochondrial substrate re-education.</p>
</body>
</html>
`;

const htmlFile = path.resolve(__dirname, "sample_protocol.html");
const pdfFile = path.resolve(__dirname, "sample_protocol.pdf");

fs.writeFileSync(htmlFile, htmlContent, "utf8");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const cmd = `"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfFile}" "${htmlFile}"`;

try {
  execSync(cmd);
  const stats = fs.statSync(pdfFile);
  console.log("SUCCESS! Generated vector PDF cleanly for free!");
  console.log("PDF File:", pdfFile);
  console.log("File Size:", stats.size, "bytes");
} catch (e) {
  console.error("PDF generation failed:", e.message);
}
