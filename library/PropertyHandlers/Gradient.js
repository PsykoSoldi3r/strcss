"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gradient = function () {
  function Gradient() {
    _classCallCheck(this, Gradient);

    this.propertyKey = "gradient";
  }

  _createClass(Gradient, [{
    key: "parse",
    value: function parse(property) {
      var _out = "";
      var _split = property.value.split(" ");
      _out += "background-image: linear-gradient(" + _split[0] + ", " + _split[1] + ", " + _split[2] + ");";
      return _out;
    }
  }]);

  return Gradient;
}();

exports.default = Gradient;