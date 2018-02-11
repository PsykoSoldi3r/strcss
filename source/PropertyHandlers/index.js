import Align from "./Align";
import Alpha from "./Alpha";
import Font from "./Font";
import Frostblur from "./Frostblur";
import Gradient from "./Gradient";
import Image from "./Image";
import MaxSize from "./MaxSize";
import MinSize from "./MinSize";
import Order from "./Order";
import Scale from "./Scale";
import Scroll from "./Scroll";
import Shadow from "./Shadow";
import Size from "./Size";
import TextColor from "./TextColor";
import Wallpaper from "./Wallpaper";

export const PropertyHandlers = [
  new Gradient(),
  new Shadow(),
  new Align(),
  new Order(),
  new Font(),
  new Alpha(),
  new TextColor(),
  new Scale(),
  new Image(),
  new Wallpaper(),
  new Frostblur(),
  new Scroll(),
  new Size(),
  new MinSize(),
  new MaxSize()
];
