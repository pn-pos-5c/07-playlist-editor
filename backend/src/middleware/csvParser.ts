import * as fs from "fs";

export default class CsvParser {

    parse(path: string): any[] {
        const result: any[] = [];
        const lines: string[] = fs.readFileSync(path).toString().replace(/\r?\r/g, '').split('\n');
        let headers: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            let line: string[] = lines[i].split('",');
            line = line.join('|').replace(/"/g, '').split('|');

            if (i === 0) {
                headers = CsvParser.lowerCase(line);
                continue;
            }

            let object: any = {};
            for (let j = 0; j < line.length; j++) {
                if (!isNaN(Number(line[j]))) {
                    object[headers[j]] = parseInt(line[j]);
                } else {
                    object[headers[j]] = line[j];
                }
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
