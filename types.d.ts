export class Sheet {
  constructor(sheet: String, options?: any);
  private sheetText: String;
  private sheetRules: String[];
  private css: String;
  public map: any;
  public get(names: string): string;
}
