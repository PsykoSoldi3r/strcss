const { Sheet } = require("../.");
const { drawSpacing, drawSeperator } = require("./testUtils");
const cssbeautify = require("cssbeautify");

drawSpacing(10);
drawSeperator("Running StrCSS tests");

const test1 = new Sheet(`

  map figure
    position relative
    borderRadius 6
    margin 0 20 20 20
    padding 20
    boxShadow 0 0 10 0 rgba(0,0,0,0.1)
    background white
    overflow hidden

  map figureActive
    gradient 90 #ef574f #eb7e39

  map figureDone
    opacity .5
  
  map name
    fontWeight bolder
    fontSize 20
    marginBottom 5
  map name in figureActive
    color purple

  map details
    opacity .5
    fontSize 16
  map details in figureActive
    opacity 1
    color white

  map chars
    position absolute
    top 50%
    right 20
    order 0
    marginTop -15px
  map char
    fontWeight bold
    textTransform uppercase
    fontSize 30
    lineHeight 30
    opacity .2
  map charActive
    opacity 1
    color white
    
  map progression
    position absolute
    rect auto 0 0 0
    height 5
    background white
    transition 0.5s width ease-in-out
`);

drawSeperator("test");
console.log(test1.map);
drawSpacing(1);
console.log(cssbeautify(test1.css));
drawSpacing(2);
