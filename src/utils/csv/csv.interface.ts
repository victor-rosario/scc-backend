export interface ISheetCSV {
    columns: Array<string>
    rows: Array<ObjectI>
    sheetName: string,
}

export interface ITablesCSV {
    sheets: Array<ISheetCSV>
}