'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ToReactComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToReactComponent(sheet) {
    var components = [];
    for (var mappedKey in sheet.map) {
        components.push(_react2.default.createElement(
            'div',
            { className: sheet.map[mappedKey] },
            'OK'
        ));
    }
    return components;
}