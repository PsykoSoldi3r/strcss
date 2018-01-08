export class Sheet {
    constructor (css: String);
    public baseName: String;
    private css: String;
    private apply: () => void;
    private lineIsProp: (cssLine: String) => boolean;
    private lineIsKey: (cssLine: String) => boolean;
    private getWhitelessLine: (cssLine: String) => String;
    private getPropLine: (cssLine: String) => String;
}