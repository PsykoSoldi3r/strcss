/**
 * Takes a path to a file and sets it as the
 * containing background image of the element.
 */
export default class Image {
  constructor() {
    this.propertyKey = "image";
  }
  parse(property) {
    return {
      "background-image": `url(${property.value})`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "background-size": "contain"
    };
  }
}
