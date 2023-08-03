import { csvData } from "./files.js"; // Import the csvData from files.js module
import xss from "xss"; // Import the xss library for input sanitization

export async function users(req, res, csvDataTests) {
  try {
    const searchTerm = xss(req.query.q); // Sanitize the search term to prevent XSS attacks

    // Check for missing search term
    if (!searchTerm) {
      return res.status(400).json({ error: "No search term provided" });
    }

    // Use csvData from files.js or csvDataTests if provided
    const csvProcessData = csvData ? csvData : csvDataTests;

    // Check for missing CSV data
    if (!csvProcessData) {
      return res.status(400).json({ error: "No data" });
    }

    // Filter CSV data based on the search term (case-insensitive)
    const filteredData = csvProcessData.filter((row) =>
      Object.values(row).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Respond with the filtered data
    res.json({ data: filteredData });
  } catch (error) {
    console.error(error); // Log any errors that occur during processing
    res.status(500).json({ error: "Internal server error" });
  }
}
