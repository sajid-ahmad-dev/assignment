const { extractFeatures } = require("../src/utils/pdf-parser");
const path = require("path");

test("Extract structured text from test3 (1).pdf", async () => {
  const pdfPath = path.join(__dirname, "../input_pdfs/test3 (1).pdf");
  const extractedData = await extractFeatures(pdfPath);

  expect(extractedData.length).toBeGreaterThan(0);
  expect(extractedData.some((item) => item.text.includes("BANK NAME"))).toBe(
    true
  );
});
