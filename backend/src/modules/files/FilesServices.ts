import { FileParser } from '../../libraries/csv-parser';

export class FilesServices {
    private fileParser: FileParser

    constructor() {
        this.fileParser = new FileParser();
    }

    async importUsers(filePath: string) {
        return await this.fileParser.parseCSV(filePath)
    }
}