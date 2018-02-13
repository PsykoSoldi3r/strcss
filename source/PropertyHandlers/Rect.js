export default class Rect {
  constructor() {
    this.propertyKey = "rect";
  }
  parse(property) {
    if (property.value === "stretch") {
      return {
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%"
      };
    } else if (property.value === "fit") {
      return {
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px"
      };
    } else {
      let _split = property.value.split(" ");
      switch (_split.length) {
        case 1:
          return {
            top: _split[0],
            left: _split[0],
            right: _split[0],
            bottom: _split[0]
          };
        case 2:
          return {
            top: _split[0],
            left: _split[1],
            right: _split[0],
            bottom: _split[1]
          };
        case 3:
          return {
            top: _split[0],
            left: _split[1],
            right: _split[2],
            bottom: _split[1]
          };
        case 4:
          return {
            top: _split[0],
            left: _split[1],
            right: _split[2],
            bottom: _split[3]
          };
      }
    }
    return {
      rect: "failed"
    };
  }
}
