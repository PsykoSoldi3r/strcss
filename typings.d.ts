export class Sheet {
    constructor (
        componentName: String,
        ccs: String
    );
    private apply: () => void;
    private lineIsProp: (cssLine: String) => bool;
    private lineIsKey: (cssLine: String) => bool;
    private getWhitelessLine: (cssLine: String) => String;
    private getPropLine: (cssLine: String) => String;
}