export default class TextColor {
  constructor() {
    this.propertyKey = "text-color";
  }
  parse(property) {
    return { color: property.value };
  }
}
