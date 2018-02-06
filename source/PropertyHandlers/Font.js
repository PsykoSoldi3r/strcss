export default class Font {
  constructor() {
    this.propertyKey = "font";
  }
  parse(property) {
    return `font-family: '${property.value}', sans;`;
  }
}
