export default class MaxSize {
  constructor() {
    this.propertyKey = "max-size";
  }
  parse(property) {
    let _split = property.value.split(" ");
    return {
      "max-width": _split[0],
      "max-height": _split[1] || _split[0]
    };
  }
}
