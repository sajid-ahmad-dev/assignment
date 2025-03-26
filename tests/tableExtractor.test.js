const fs = require("fs-extra");
const xlsx = require("xlsx"); // ✅ Import xlsx
const path = require("path");

const OUTPUT_EXCEL = path.join(__dirname, "../output/test3 (1).xlsx");

test("Verify extracted Excel file contents", async () => {
  const workbook = xlsx.readFile(OUTPUT_EXCEL);
  const sheetNames = workbook.SheetNames;
  console.log("✅ Extracted Sheets:", sheetNames);

  sheetNames.forEach((sheet) => {
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {
      header: 1,
    });
    console.log(`📄 Data from ${sheet}:`, data);
  });

  expect(sheetNames.length).toBeGreaterThan(0); // Ensure at least one sheet exists
});
