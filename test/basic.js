const { Sheet } = require("../.");
const { drawSpacing, drawSeperator } = require("./testUtils");
const cssbeautify = require("cssbeautify");

drawSpacing(10);
drawSeperator("Running StrCSS tests");

const test1 = new Sheet(`
  map test
    size 10 100
`);

drawSeperator("test 1 - map");
console.log(test1.map);
drawSpacing(1);
console.log(cssbeautify(test1.css));
drawSpacing(2);

const test2 = new Sheet(`
  map test
    color red
  on hover
    color green
  on last-child
    margin 10
`);

drawSeperator("test 2 - on");
console.log(test2.map);
drawSpacing(1);
console.log(cssbeautify(test2.css));
drawSpacing(2);

const test3 = new Sheet(`
  map test
  at mobile
    size 10
  at tablet
    size 20
  at desktop
    size 30
`);

drawSeperator("test 3 - at");
console.log(test3.map);
drawSpacing(1);
console.log(cssbeautify(test3.css));
drawSpacing(2);

const test4 = new Sheet(`
  map button
    color grey
  on hover
    color green
  at mobile
    color black
  on hover
    color orange
`);

drawSeperator("test 4 - at/on");
console.log(test4.map);
drawSpacing(1);
console.log(cssbeautify(test4.css));
drawSpacing(2);

const test5 = new Sheet(
  `
  map customProperties
    #align
    align center
    #gradient
    gradient 45 red green
    #shadow
    shadow 0 10
    #order
    order 5
    #font
    font lato
    #alpha
    alpha .5
    #textColor
    textColor red
    #scale (1)
    scale 1.1
    #scale (2)
    scale 1.1 1.2
    #image
    image dog.jpg
    #wallpaper
    wallpaper cat.png
    #frostblur
    frostblur 10
    #scroll (1)
    scroll vertical
    #scroll (2)
    scroll horizontal
    #scroll (3)
    scroll both
    #size (1)
    size 10
    #size (2)
    size 20 50
    #min-size (1)
    minSize 20
    #min-size (2)
    minSize 30 50
    #max-size (1)
    maxSize 40
    #max-size (2)
    maxSize 60 40
    #flexy (1)
    flexy row
    #flexy (2)
    flexy column
    #flexy (3)
    flexy 10
    #rect (1)
    rect 10
    #rect (2)
    rect 10 20
    #rect (3)
    rect 10 20 30
    #rect (4)
    rect 10 20 30 40
`,
  {
    comments: true
  }
);

drawSeperator("test 5 - properties");
console.log(test5.map);
drawSpacing(1);
console.log(cssbeautify(test5.css));
drawSpacing(2);

const test6 = new Sheet(`
  map test
    fontSize 10
    order 1
    z-index 1
    flex 1
    margin 10 10% 10em 10vh
    padding 10 30 40% 10
`);

drawSeperator("test 6 - auto suffixer");
console.log(test6.map);
drawSpacing(1);
console.log(cssbeautify(test6.css));
drawSpacing(2);

const test7 = new Sheet(`
  map parent
    shouldBe parent
  map child
    shouldBe child
  map child in parent
    shouldBe child-in-parent
  on hover
    shouldBe child-on-hover-in-parent
  map child in parent on hover
    shouldBe child-in-parent-on-hover
  on hover
    shouldBe child-on-hover-in-parent-on-hover
`);

drawSeperator("test 7 - nesting");
console.log(test7.map);
drawSpacing(1);
console.log(cssbeautify(test7.css));
drawSpacing(2);
