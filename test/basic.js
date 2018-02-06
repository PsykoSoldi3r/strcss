const { Sheet } = require("../.");
const { drawSpacing, drawSeperator } = require("./testUtils");

const sheet = new Sheet(`

  # MAP
  map test1
    size 10 100
  
  # ON
  map test2
    color red
  on hover
    color green
  on last-child
    color yellow

  # AT
  map test3
  at mobile
    test mobile
  at tablet
    test tablet
  at desktop
    test desktop
  
  # combination ON and AT
  map test4
    test normal
  on hover
    test normal-hover
  at mobile
   test mobile
  on hover
    test mobile-hover

  # IN
  map cont
    test cont
  map in but
    test but
  map but in cont
    test but-in-cont
  map but in cont on hover
    test but-in-cont-hover
`);

drawSpacing(10);
drawSeperator("Start");
drawSeperator("css");
console.log(sheet.css);
drawSeperator("map");
console.log(sheet.map);
drawSpacing(3);
