'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utseende = require('./Utseende');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Constants = function () {
    function Constants() {
        _classCallCheck(this, Constants);
    }

    _createClass(Constants, null, [{
        key: 'set',
        value: function set(newConstants) {
            for (var newConstantKey in newConstants) {
                _Utseende.constants[newConstantKey] = newConstants[newConstantKey];
            }
        }
    }]);

    return Constants;
}();

exports.default = Constants;