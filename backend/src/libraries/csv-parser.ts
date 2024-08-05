import {UserDTO} from "../api/users/UserDto";
import Papa from "papaparse";
import fs from "fs";

import {CustomError} from "../types/CustomError";

export class FileParser {
    async parseCSV(filePath: string): Promise<UserDTO[]> {
        try {
            const data = await fs.promises.readFile(filePath, "utf8");
            if (!data) {
                const error = new Error(`File is empty or failed to read the file`)
                error.name = "EMPTY_FILE"
                throw error;
            }

            const results = Papa.parse<UserDTO>(data, { header: true });
            if (results.errors.length > 0) {
                const error = new Error(`CSV parsing errors: ${results.errors[0].message}`)
                error.name = "PARSE_ERROR"
                throw error;
            }

            //await fs.promises.unlink(filePath);
            return results.data;
        } catch (err: any) {
            if (err.code === "ENOENT") {
                const error = new Error(`File not found at ${filePath}`)
                error.name = "NOT_FOUND"
                throw error;
            } else {
                const error = new Error(err.message)
                error.name = "PARSE_ERROR"
                throw error;
            }
        }
    }
}
