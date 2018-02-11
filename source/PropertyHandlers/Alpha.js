/**
 * Takes any number from 0 to 1 and sets
 * it as the opacity of an element.
 */
export default class Alpha {
  constructor() {
    this.propertyKey = "alpha";
  }
  parse(property) {
    return { opacity: property.value };
  }
}
