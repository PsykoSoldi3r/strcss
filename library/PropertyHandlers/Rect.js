"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function () {
  function Rect() {
    _classCallCheck(this, Rect);

    this.propertyKey = "rect";
  }

  _createClass(Rect, [{
    key: "parse",
    value: function parse(property) {
      if (property.value === "stretch") {
        return {
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%"
        };
      } else if (property.value === "fit") {
        return {
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px"
        };
      } else {
        var _split = property.value.split(" ");
        switch (_split.length) {
          case 1:
            return {
              top: _split[0],
              right: _split[0],
              bottom: _split[0],
              left: _split[0]
            };
          case 2:
            return {
              top: _split[0],
              right: _split[1],
              bottom: _split[0],
              left: _split[1]
            };
          case 3:
            return {
              top: _split[0],
              right: _split[1],
              bottom: _split[2],
              left: _split[1]
            };
          case 4:
            return {
              top: _split[0],
              right: _split[1],
              bottom: _split[2],
              left: _split[3]
            };
        }
      }
      return {
        rect: "failed"
      };
    }
  }]);

  return Rect;
}();

exports.default = Rect;