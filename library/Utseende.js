'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uniques = exports.sheetCache = exports.constants = exports.Constants = exports.Sheet = undefined;

var _Sheet = require('./Sheet');

var _Sheet2 = _interopRequireDefault(_Sheet);

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = {};
var sheetCache = {};
var uniques = [];

exports.Sheet = _Sheet2.default;
exports.Constants = _Constants2.default;
exports.constants = constants;
exports.sheetCache = sheetCache;
exports.uniques = uniques;