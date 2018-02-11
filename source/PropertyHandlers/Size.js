export default class Size {
  constructor() {
    this.propertyKey = "size";
  }
  parse(property) {
    let _split = property.value.split(" ");
    return {
      width: _split[0],
      height: _split[1] || _split[0]
    };
  }
}
