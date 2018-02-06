export default class Alpha {
  constructor() {
    this.propertyKey = "alpha";
  }
  parse(property) {
    return `opacity: ${property.value};`;
  }
}
