export default class Scale {
  constructor() {
    this.propertyKey = "scale";
  }
  parse(property) {
    let _split = property.value.split(" ");
    return { transform: `scale(${_split[0]}, ${_split[1] || _split[0]})` };
  }
}
