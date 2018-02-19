"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shadow = function () {
  function Shadow() {
    _classCallCheck(this, Shadow);

    this.propertyKey = "shadow";
  }

  _createClass(Shadow, [{
    key: "parse",
    value: function parse(property) {
      var _split = property.value.split(" ");
      switch (_split.length) {
        case 3:
          var _alpha = _split[2].replace("px", "");
          return {
            "box-shadow": "0px 0px " + _split[0] + " " + _split[1] + " rgba(0,0,0," + _alpha + ")"
          };
        default:
          return {
            "box-shadow": "0px 0px " + property.value + " rgba(0,0,0,0.2)"
          };
      }
    }
  }]);

  return Shadow;
}();

exports.default = Shadow;