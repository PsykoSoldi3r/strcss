export default class Frostblur {
  constructor() {
    this.propertyKey = "frostblur";
  }
  parse(property) {
    return { "-webkit-backdrop-filter": `blur(${property.value})` };
  }
}
