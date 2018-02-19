export default class Order {
  constructor() {
    this.propertyKey = "order";
  }
  parse(property) {
    return { "z-index": property.value };
  }
}
