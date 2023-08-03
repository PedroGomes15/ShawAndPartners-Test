import fs from "fs";
import csv from "csv-parser";

export let csvData = null;

export async function files(req, res) {
  const { file } = req;

  // Check for invalid file
  if (!file || !file.path || !file.mimetype) {
    return res.status(400).json({ error: "Invalid file" });
  }

  const results = [];
  // Check for invalid file type
  if (file.mimetype !== "text/csv") {
    return res.status(400).json({ error: "Invalid file type. Only CSV files are allowed." });
  }

  fs.createReadStream(file.path)
    .on("error", (err) => {
      console.error("Error: ", err);
      res.status(500).json({ error: "Error occurred while reading CSV file" });
    })
    .pipe(csv())
    .on("data", (data) => {
      results.push(data); // Collect CSV data
    })
    .on("end", () => {
      fs.unlink(file.path, (err) => {
        if (err) throw err;
      }); // Remove temporary file

      // Check for empty CSV
      if (results.length === 0) {
        return res.status(400).json({ error: "Empty CSV file" });
      }

      csvData = results; // Store the CSV data
      res.status(200).json({ message: "CSV file uploaded successfully", data: csvData });
    });
}
