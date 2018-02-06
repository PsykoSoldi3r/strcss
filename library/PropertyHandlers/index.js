"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyHandlers = undefined;

var _Gradient = require("./Gradient");

var _Gradient2 = _interopRequireDefault(_Gradient);

var _Shadow = require("./Shadow");

var _Shadow2 = _interopRequireDefault(_Shadow);

var _Align = require("./Align");

var _Align2 = _interopRequireDefault(_Align);

var _Order = require("./Order");

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyHandlers = exports.PropertyHandlers = [new _Gradient2.default(), new _Shadow2.default(), new _Align2.default(), new _Order2.default()];