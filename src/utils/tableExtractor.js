function groupByLines(extractedData) {
  let lines = {};

  extractedData.forEach((item) => {
    let yKey = Math.round(item.y * 10) / 10; // More precision for better grouping

    if (!lines[yKey]) {
      lines[yKey] = [];
    }

    lines[yKey].push(item);
  });

  // Sort lines vertically and each line horizontally
  return Object.values(lines)
    .sort((a, b) => a[0].y - b[0].y)
    .map((line) => line.sort((a, b) => a.x - b.x));
}

function extractTableData(extractedData) {
  let structuredLines = groupByLines(extractedData);
  let table = [];

  structuredLines.forEach((line) => {
    let row = line.map((item) => item.text.trim());
    table.push(row);
  });

  return table;
}

module.exports = { extractTableData };
