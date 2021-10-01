import * as fs from "fs";

export default class CsvParser {

    parse(path: string): any[] {
        const result: any[] = [];
        const lines: string[] = fs.readFileSync(path).toString().replace(/"/g, '').split('\n');
        let headers: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line: string[] = lines[i].split(',');
            if (i === 0) {
                headers = CsvParser.lowerCase(line);
                continue;
            }

            let object: any = {};
            for (let j = 0; j < line.length; j++) {
                object[headers[j]] = line[j];
            }

            result.push(object);
        }

        return result;
    }

    private static lowerCase(line: string[]): string[] {
        for (let i = 0; i < line.length; i++) {
            line[i] = line[i].charAt(0).toLowerCase() + line[i].slice(1);
        }

        return line;
    }

}
