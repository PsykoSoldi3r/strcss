"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Takes any number from 0 to 1 and sets
 * it as the opacity of an element.
 */
var Alpha = function () {
  function Alpha() {
    _classCallCheck(this, Alpha);

    this.propertyKey = "alpha";
  }

  _createClass(Alpha, [{
    key: "parse",
    value: function parse(property) {
      return { opacity: property.value };
    }
  }]);

  return Alpha;
}();

exports.default = Alpha;