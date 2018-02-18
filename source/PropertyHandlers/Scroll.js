export default class Scroll {
  constructor() {
    this.propertyKey = "scroll";
  }
  parse(property) {
    switch (property.value) {
      case "horizontal":
        return {
          margin: "0px",
          padding: "0px",
          overflow: "scroll",
          "overflow-y": "hidden",
          "white-space": "nowrap",
          "-webkit-overflow-scrolling": "scroll"
        };
      case "vertical":
        return {
          margin: "0px",
          padding: "0px",
          overflow: "scroll",
          "overflow-x": "hidden",
          "white-space": "nowrap",
          "-webkit-overflow-scrolling": "scroll"
        };
      case "both":
        return {
          margin: "0px",
          padding: "0px",
          overflow: "scroll",
          "white-space": "nowrap",
          "-webkit-overflow-scrolling": "scroll"
        };
    }
  }
}
