export default class MinSize {
  constructor() {
    this.propertyKey = "min-size";
  }
  parse(property) {
    let _split = property.value.split(" ");
    return {
      "min-width": _split[0],
      "min-height": _split[1] || _split[0]
    };
  }
}
