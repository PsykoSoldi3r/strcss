export default class Shadow {
  constructor() {
    this.propertyKey = "shadow";
  }
  parse(property) {
    return `box-shadow: 0px 0px ${property.value} rgba(0,0,0,0.2)`;
  }
}
