/**
 * Takes an font name and sets it as the
 * font families first member with an
 * fallback to any sans font.
 */
export default class TextFont {
  constructor() {
    this.propertyKey = "text-font";
  }
  parse(property) {
    return { "font-family": `'${property.value}', sans` };
  }
}
