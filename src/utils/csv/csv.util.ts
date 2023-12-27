import { ITablesCSV } from './csv.interface'

function createTablesCsv(data: ITablesCSV) {
    const result: Array<string> = [];

    data.sheets.forEach((sheet) => {
        const data = [sheet.columns.join(","),
        ...sheet.rows.map((row) => {
            return Object.values(row).map(x => `${x}`).join(",");
        })].join("\n");

        result.push(data);
    });
    return Promise.resolve(result.join(","));
}

export default createTablesCsv