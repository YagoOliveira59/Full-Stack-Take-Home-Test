import { describe, expect, jest, it, beforeEach } from "@jest/globals";
import fs from "fs";
import Papa from "papaparse";

import { FileParser } from "../libraries/csv-parser";

describe("CsvParse", () => {
  let fileParser: FileParser;

  beforeEach(() => {
    fileParser = new FileParser();
  });

  it("parses valid CSV file correctly", async () => {
    const mockData = "name,age\nJohn Doe,30\nJane Doe,25";
    jest.spyOn(fs.promises, "readFile").mockResolvedValue(mockData);

    const result = await fileParser.parseCSV("files/valid_users.csv");
    expect(result).toEqual([{ name: "John Doe", age: "30" }, { name: "Jane Doe", age: "25" }]);
  });

  it("throws error for empty CSV file", async () => {
    jest.spyOn(fs.promises, "readFile").mockResolvedValue("");
    await expect(fileParser.parseCSV("files/empty.csv")).rejects.toThrow("File is empty or failed to read the file");
  });

  it("throws error for CSV file with parsing errors", async () => {
    const mockData = "name,age\nJohn Doe,30\nJane Doe";
    jest.spyOn(fs.promises, "readFile").mockResolvedValue(mockData);
    await expect(fileParser.parseCSV("files/invalid_users.csv"))
        .rejects.toThrow("CSV parsing errors: Unable to auto-detect delimiting character; defaulted to ','");
  });

  it("throws error if file not found", async () => {
    jest.spyOn(fs.promises, "readFile").mockRejectedValue({ code: "ENOENT" });
    await expect(fileParser.parseCSV("files/non_existent.csv")).rejects.toThrow("File not found");
  });

});