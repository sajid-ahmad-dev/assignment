const xlsx = require("xlsx");

function saveTableToExcel(tableData, fileName) {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(tableData);

  xlsx.utils.book_append_sheet(wb, ws, "ExtractedTable");
  xlsx.writeFile(wb, fileName);
}

module.exports = { saveTableToExcel };
