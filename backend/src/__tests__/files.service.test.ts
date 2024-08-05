import {beforeEach, describe, expect, it} from "@jest/globals";
import {FilesServices} from "../modules/files/FilesServices";
import {FileParser} from "../libraries/csv-parser";
import {UserDTO} from "../modules/users/UserDto";

describe('FilesServices', () => {
    let filesServices: FilesServices;
    let fileParser: FileParser;

    beforeEach(() => {
        fileParser = new FileParser();
        filesServices = new FilesServices();
    });
    it('imports users from a CSV file', async () => {
        const users: UserDTO[] = [
            {name: "John Doe", city: "New York", country: "USA", favorite_sport: "Basketball"},
            {name: "Jane Smith", city: "London", country: "UK", favorite_sport: "Football"},
        ];
        const result = await filesServices.importUsers('files/users.csv');
        expect(result).toEqual(users)
    });

    it('throws an error when the file is empty', async () => {
        await expect(filesServices.importUsers('files/users_empty.csv'))
            .rejects.toThrow('File is empty or failed to read the file');
    });

    it('throws an error when CSV parsing fails', async () => {
        await expect(filesServices.importUsers('files/users_with_error.csv'))
            .rejects.toThrow('CSV parsing errors: Too many fields: expected 3 fields but parsed 4');
    });
});