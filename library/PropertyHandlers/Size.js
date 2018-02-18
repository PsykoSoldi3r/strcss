"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Size = function () {
  function Size() {
    _classCallCheck(this, Size);

    this.propertyKey = "size";
  }

  _createClass(Size, [{
    key: "parse",
    value: function parse(property) {
      var _split = property.value.split(" ");
      return {
        width: _split[0],
        height: _split[1] || _split[0]
      };
    }
  }]);

  return Size;
}();

exports.default = Size;