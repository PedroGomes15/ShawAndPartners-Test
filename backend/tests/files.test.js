import fs from "fs";
import { files } from "../Controller/files";
import path from "path";

describe("files", () => {
  // Tests that the function successfully uploads a valid CSV file and returns a JSON object with a message and data property
  it("should upload a valid CSV file and return a JSON object with a message and data property", async () => {
    const mockFile = createTempFile("users");

    const mockCsvData = [
      { name: "John Doe", city: "New York", country: "USA", favorite_sport: "Basketball" },
    ];
    const expectedResponse = {
      message: "CSV file uploaded successfully",
      data: mockCsvData,
    };

    const req = { file: mockFile };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await new Promise((resolve) => {
      files(req, res);
      setTimeout(resolve, 200);
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
  // Tests that an empty CSV file returns a 400 error
  it("should return a 400 error when an empty CSV file is uploaded", async () => {
    const mockFile = createTempFile("empty");

    const req = { file: mockFile };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await new Promise((resolve) => {
      files(req, res);
      setTimeout(resolve, 200);
    });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Empty CSV file" });
  });
});

function createTempFile(filename) {
  const usersCsvFilePath = `./mocks/${filename}.csv`;
  const tempFilePath = `./mocks/temp_${filename}.csv`;

  const csvContent = fs.readFileSync(usersCsvFilePath, "utf8");

  fs.writeFileSync(tempFilePath, csvContent, "utf8");

  const mockFile = {
    path: tempFilePath,
    mimetype: "text/csv",
  };

  return mockFile;
}
