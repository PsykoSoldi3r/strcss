"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Align = function () {
  function Align() {
    _classCallCheck(this, Align);

    this.propertyKey = "align";
  }

  _createClass(Align, [{
    key: "parse",
    value: function parse(property) {
      switch (property.value) {
        case "left":
          return "display: block; margin-left: 0px; margin-right: auto";
        case "center":
          return "display: block; margin-left: auto; margin-right: auto";
        case "right":
          return "display: block; margin-left: auto; margin-right: 0px";
      }
      return "";
    }
  }]);

  return Align;
}();

exports.default = Align;