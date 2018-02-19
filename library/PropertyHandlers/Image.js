"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Takes a path to a file and sets it as the
 * containing background image of the element.
 */
var Image = function () {
  function Image() {
    _classCallCheck(this, Image);

    this.propertyKey = "image";
  }

  _createClass(Image, [{
    key: "parse",
    value: function parse(property) {
      return {
        "background-image": "url(" + property.value + ")",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "contain"
      };
    }
  }]);

  return Image;
}();

exports.default = Image;