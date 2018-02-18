/**
 * Takes one keyword 'left, right or center'
 * and aligns content by setting the element
 * to display block and pushing it using the
 * left and right margin.
 */
export default class Align {
  constructor() {
    this.propertyKey = "align";
  }
  parse(property) {
    switch (property.value) {
      case "left":
        return {
          display: "block",
          "margin-left": "0px",
          "margin-right": "auto"
        };
      case "center":
        return {
          display: "block",
          "margin-left": "auto",
          "margin-right": "auto"
        };
      case "right":
        return {
          display: "block",
          "margin-left": "auto",
          "margin-right": "0px"
        };
    }
    return "";
  }
}
