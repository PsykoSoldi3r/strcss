export default class Shadow {
  constructor() {
    this.propertyKey = "shadow";
  }
  parse(property) {
    let _split = property.value.split(" ");
    switch (_split.length) {
      case 3:
        let _alpha = _split[2].replace("px", "");
        return {
          "box-shadow": `0px 0px ${_split[0]} ${
            _split[1]
          } rgba(0,0,0,${_alpha})`
        };
      default:
        return {
          "box-shadow": `0px 0px ${property.value} rgba(0,0,0,0.2)`
        };
    }
  }
}
