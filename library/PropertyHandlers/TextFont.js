"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Takes an font name and sets it as the
 * font families first member with an
 * fallback to any sans font.
 */
var TextFont = function () {
  function TextFont() {
    _classCallCheck(this, TextFont);

    this.propertyKey = "text-font";
  }

  _createClass(TextFont, [{
    key: "parse",
    value: function parse(property) {
      return { "font-family": "'" + property.value + "', sans" };
    }
  }]);

  return TextFont;
}();

exports.default = TextFont;