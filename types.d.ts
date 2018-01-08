export class Sheet {
    constructor (css: String);
    private sheetText: String;
    private sheetRules: String[];
    private css: String;
    public map: any;
}

export class Constants {
    public static set (newConstants: any): void;
}
