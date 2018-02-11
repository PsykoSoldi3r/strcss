export default class Gradient {
  constructor() {
    this.propertyKey = "gradient";
  }
  parse(property) {
    let _split = property.value.split(" ");
    return {
      "background-image": `linear-gradient(${_split[0]}, ${_split[1]}, ${
        _split[2]
      })`
    };
  }
}
