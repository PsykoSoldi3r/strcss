import Gradient from "./Gradient";
import Shadow from "./Shadow";
import Align from "./Align";
import Order from "./Order";
import Font from "./Font";
import Alpha from "./Alpha";
import TextColor from "./TextColor";

export const PropertyHandlers = [
  new Gradient(),
  new Shadow(),
  new Align(),
  new Order(),
  new Font(),
  new Alpha(),
  new TextColor()
];
