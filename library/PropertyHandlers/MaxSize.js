"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaxSize = function () {
  function MaxSize() {
    _classCallCheck(this, MaxSize);

    this.propertyKey = "max-size";
  }

  _createClass(MaxSize, [{
    key: "parse",
    value: function parse(property) {
      var _split = property.value.split(" ");
      return {
        "max-width": _split[0],
        "max-height": _split[1] || _split[0]
      };
    }
  }]);

  return MaxSize;
}();

exports.default = MaxSize;