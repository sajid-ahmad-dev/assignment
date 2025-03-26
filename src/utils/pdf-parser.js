const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/build/pdf");

async function extractFeatures(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdfDocument = await pdfjsLib.getDocument({ data }).promise;
  let extractedData = [];

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const content = await page.getTextContent();

    let pageData = content.items.map((item) => ({
      text: item.str.trim(),
      x: item.transform[4],
      y: item.transform[5],
      width: item.width,
    }));

    extractedData.push(...pageData);
  }

  return extractedData;
}

module.exports = { extractFeatures };
