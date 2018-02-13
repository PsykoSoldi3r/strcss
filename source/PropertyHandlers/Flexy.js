export default class Flexy {
  constructor() {
    this.propertyKey = "flexy";
  }
  parse(property) {
    switch (property.value) {
      case "row":
        return {
          display: "flex",
          "flex-direction": "row",
          "flex-wrap": "nowrap",
          "justify-content": "flex-start",
          "align-content": "stretch"
        };
      case "column":
        return {
          display: "flex",
          "flex-direction": "column",
          "flex-wrap": "nowrap",
          "justify-content": "flex-start",
          "align-content": "stretch"
        };
      default:
        return {
          flex: `${property.value} 1 auto`,
          "align-self": "auto"
        };
    }
  }
}
