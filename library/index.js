'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uniques = exports.sheetCache = exports.Sheet = undefined;

var _Sheet = require('./Sheet');

var _Sheet2 = _interopRequireDefault(_Sheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sheetCache = {};
var uniques = [];

exports.Sheet = _Sheet2.default;
exports.sheetCache = sheetCache;
exports.uniques = uniques;