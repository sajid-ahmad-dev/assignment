const fs = require("fs");
const path = require("path");
const { extractFeatures } = require("./utils/pdf-parser");
const { extractTableData } = require("./utils/tableExtractor");
const { saveTableToExcel } = require("./utils/excelWriter");

// Define input and output folder paths
const INPUT_DIRECTORY = path.resolve(__dirname, "../input_pdfs");
const OUTPUT_DIRECTORY = path.resolve(__dirname, "../output");

// Ensure the output folder exists
if (!fs.existsSync(OUTPUT_DIRECTORY)) {
  fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
}

async function processPDFFile(pdfFile) {
  const inputFilePath = path.join(INPUT_DIRECTORY, pdfFile);
  const outputFilePath = path.join(
    OUTPUT_DIRECTORY,
    pdfFile.replace(".pdf", ".xlsx")
  );

  try {
    console.log(`Processing: ${pdfFile}`);

    const extractedContent = await extractFeatures(inputFilePath);
    const extractedTables = extractTableData(extractedContent);

    if (!extractedTables || extractedTables.length === 0) {
      console.warn(` No tables found in ${pdfFile}`);
      return;
    }

    saveTableToExcel(extractedTables, outputFilePath);
    console.log(`Extraction complete! File saved: ${outputFilePath}`);
  } catch (err) {
    console.error(` Error processing ${pdfFile}:`, err.message);
  }
}

// Process each PDF in the input folder
fs.readdirSync(INPUT_DIRECTORY)
  .filter((file) => file.toLowerCase().endsWith(".pdf"))
  .forEach(processPDFFile);
