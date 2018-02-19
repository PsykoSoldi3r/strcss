"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flexy = function () {
  function Flexy() {
    _classCallCheck(this, Flexy);

    this.propertyKey = "flexy";
  }

  _createClass(Flexy, [{
    key: "parse",
    value: function parse(property) {
      switch (property.value) {
        case "row":
          return {
            display: "flex",
            "flex-direction": "row",
            "flex-wrap": "nowrap",
            "justify-content": "flex-start",
            "align-content": "stretch"
          };
        case "column":
          return {
            display: "flex",
            "flex-direction": "column",
            "flex-wrap": "nowrap",
            "justify-content": "flex-start",
            "align-content": "stretch"
          };
        default:
          return {
            flex: property.value + " 1 auto",
            "align-self": "auto"
          };
      }
    }
  }]);

  return Flexy;
}();

exports.default = Flexy;