"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function () {
  function Scroll() {
    _classCallCheck(this, Scroll);

    this.propertyKey = "scroll";
  }

  _createClass(Scroll, [{
    key: "parse",
    value: function parse(property) {
      switch (property.value) {
        case "horizontal":
          return {
            margin: "0px",
            padding: "0px",
            overflow: "scroll",
            "overflow-y": "hidden",
            "white-space": "nowrap",
            "-webkit-overflow-scrolling": "scroll"
          };
        case "vertical":
          return {
            margin: "0px",
            padding: "0px",
            overflow: "scroll",
            "overflow-x": "hidden",
            "white-space": "nowrap",
            "-webkit-overflow-scrolling": "scroll"
          };
        case "both":
          return {
            margin: "0px",
            padding: "0px",
            overflow: "scroll",
            "white-space": "nowrap",
            "-webkit-overflow-scrolling": "scroll"
          };
      }
    }
  }]);

  return Scroll;
}();

exports.default = Scroll;