/**
 * Takes a path to a file and sets it as the
 * covering background image of the element.
 */
export default class Wallpaper {
  constructor() {
    this.propertyKey = "wallpaper";
  }
  parse(property) {
    return {
      "background-image": `url(${property.value})`,
      "background-position": "center",
      "background-repeat": "no-repeat",
      "background-size": "cover"
    };
  }
}
