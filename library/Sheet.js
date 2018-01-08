'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utseende = require('./Utseende');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sheet = function () {
    function Sheet(sheetText) {
        _classCallCheck(this, Sheet);

        this.sheetText = this.applyContants(sheetText);
        this.sheetRules = this.sheetText.split('\n');
        this.css = '';
        this.map = {};

        this.generateCSS();
        this.applyToDocument();
    }

    _createClass(Sheet, [{
        key: 'generateCSS',
        value: function generateCSS() {
            var _this = this;

            var isScoped = false;
            this.sheetRules.map(function (sheetRule) {

                if (_this.isLineTarget(sheetRule) === true) {
                    if (isScoped === true) _this.css += ' }';

                    isScoped = true;
                    var uniqueID = _this.getUniqueID();
                    var targetName = _this.getTargetName(sheetRule);

                    _this.css += '\n/* Utseende Sheet for: ' + targetName + ' */';
                    _this.css += '\n.' + uniqueID + ' {';
                    _this.map[targetName] = uniqueID;
                } else if (_this.isLineStyle(sheetRule)) {
                    var styleKeyValue = _this.getStyleKeyValue(sheetRule);
                    var parsedStyle = _this.getParsedStyle(styleKeyValue);
                    _this.css += '\n\t' + parsedStyle.key + ': ' + parsedStyle.value + ';';
                }
            });

            if (isScoped === true) this.css += ' }';
        }
    }, {
        key: 'isLineStyle',
        value: function isLineStyle(sheetRule) {
            return sheetRule[7] === ' ';
        }
    }, {
        key: 'isLineTarget',
        value: function isLineTarget(sheetRule) {
            if (typeof sheetRule[4] === 'string') return sheetRule[4] !== ' ';
            return false;
        }
    }, {
        key: 'getTargetName',
        value: function getTargetName(sheetRules) {
            return this.getLineShifted(sheetRules);
        }
    }, {
        key: 'getLineShifted',
        value: function getLineShifted(sheetRules) {
            return sheetRules.slice(sheetRules.search(/\S|$/), sheetRules.length);
        }
    }, {
        key: 'getUniqueID',
        value: function getUniqueID() {
            _Utseende.uniques.push('id');
            var id = '_UTSEENDE';
            for (var i = 0; i < 3; i++) {
                id += '_' + Math.round(Math.random() * 1000) + _Utseende.uniques.length * (i + 1);
            }return id + '_';
        }
    }, {
        key: 'applyContants',
        value: function applyContants(sheetText) {
            for (var constantKey in _Utseende.constants) {
                sheetText = sheetText.replace(new RegExp('\\$' + constantKey, 'g'), _Utseende.constants[constantKey]);
            }
            return sheetText;
        }
    }, {
        key: 'getStyleKeyValue',
        value: function getStyleKeyValue(sheetText) {
            var key = this.getLineShifted(sheetText).split(' ')[0];
            var value = this.getLineShifted(sheetText.replace(key, ''));
            return {
                key: key,
                value: value
            };
        }
    }, {
        key: 'addNumericEndings',
        value: function addNumericEndings(styleKeyValue, suffix) {
            var parsedString = '';
            var valueSplits = styleKeyValue.value.split(' ');
            valueSplits.map(function (valueSplit) {
                var rgx = /^((\d+)?(\.\d+)?\d)$/g;
                var matches = rgx.exec(valueSplit);

                if (matches !== null) {
                    valueSplit = valueSplit.replace(matches[1], '' + matches[1] + suffix);
                }
                parsedString += valueSplit + ' ';
            });
            styleKeyValue.value = parsedString.substr(0, parsedString.length - 1);
        }
    }, {
        key: 'addSpaceSeperators',
        value: function addSpaceSeperators(styleKeyValue, seperator) {
            var parsedString = '';
            var valueSplits = styleKeyValue.value.split(' ');
            valueSplits.map(function (valueSplit) {
                parsedString += '' + valueSplit + seperator + ' ';
            });
            styleKeyValue.value = parsedString.substr(0, parsedString.length - (seperator.length + 1));
        }
    }, {
        key: 'applyToDocument',
        value: function applyToDocument() {
            if (typeof document === 'undefined ' || typeof window === 'undefined') return; /* node env? */

            var htmlStyleTag = document.createElement("style");
            htmlStyleTag.type = "text/css";
            htmlStyleTag.innerHTML = this.css;
            document.head.appendChild(htmlStyleTag);
        }
    }, {
        key: 'getParsedStyle',
        value: function getParsedStyle(styleKeyValue) {
            switch (styleKeyValue.key) {
                case 'gradient':
                case 'background-image':
                    this.addNumericEndings(styleKeyValue, 'deg');
                    break;
                case 'depth':
                case 'order':
                case 'z-index':
                case 'opacity':
                    break;
                default:
                    this.addNumericEndings(styleKeyValue, 'px');
                    break;
            }
            switch (styleKeyValue.key) {
                case 'gradient':
                    this.addSpaceSeperators(styleKeyValue, ',');
                    styleKeyValue.key = 'background-image';
                    styleKeyValue.value = 'linear-gradient(' + styleKeyValue.value + ')';
                    break;
                case 'shadow':
                    styleKeyValue.key = 'box-shadow';
                    styleKeyValue.value = '0px 0px ' + styleKeyValue.value + ' rgba(0,0,0,0.5)';
                    break;
                case 'order':
                    styleKeyValue.key = 'z-index';
                    break;
                case 'text-color':
                    styleKeyValue.key = 'color';
                    break;
                case 'image':
                    styleKeyValue.value = 'url(' + styleKeyValue.value + ');\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: contain';
                    styleKeyValue.key = 'background-image';
                    break;
                case 'wallpaper':
                    styleKeyValue.value = 'url(' + styleKeyValue.value + ');\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: cover';
                    styleKeyValue.key = 'background-image';
                    break;
                case 'size':
                    var sizeSplittedValues = styleKeyValue.value.split(' ');
                    styleKeyValue.value = sizeSplittedValues[0] + ';\n\theight: ' + sizeSplittedValues[1];
                    styleKeyValue.key = 'width';
                    break;
                case 'min-size':
                    var minSizeSplittedValues = styleKeyValue.value.split(' ');
                    styleKeyValue.value = minSizeSplittedValues[0] + ';\n\tmin-height: ' + minSizeSplittedValues[1];
                    styleKeyValue.key = 'min-width';
                    break;
                case 'max-size':
                    var maxSizeSplittedValues = styleKeyValue.value.split(' ');
                    styleKeyValue.value = maxSizeSplittedValues[0] + ';\n\tmax-height: ' + maxSizeSplittedValues[1];
                    styleKeyValue.key = 'max-width';
                    break;
                case 'rect':
                    styleKeyValue.key = 'top';
                    if (styleKeyValue.value === 'stretch') {
                        styleKeyValue.value = '0px;\n\tleft: 0px;\n\twidth: 100%;\n\theight: 100%';
                    } else if (styleKeyValue.value === 'fit') {
                        styleKeyValue.value = '0px;\n\tright: 0px;\n\tbottom: 0px;\n\tleft: 0px';
                    } else {
                        var splittedValues = styleKeyValue.value.split(' ');
                        switch (splittedValues.length) {
                            case 1:
                                styleKeyValue.value = splittedValues[0] + ';\n\tright: ' + splittedValues[0] + ';\n\tbottom: ' + splittedValues[0] + ';\n\tleft: ' + splittedValues[0];
                                break;
                            case 2:
                                styleKeyValue.value = splittedValues[0] + ';\n\tright: ' + splittedValues[1] + ';\n\tbottom: ' + splittedValues[0] + ';\n\tleft: ' + splittedValues[1];
                                break;
                            case 3:
                                styleKeyValue.value = splittedValues[0] + ';\n\tright: ' + splittedValues[1] + ';\n\tbottom: ' + splittedValues[2] + ';\n\tleft: ' + splittedValues[1];
                                break;
                            case 4:
                                styleKeyValue.value = splittedValues[0] + ';\n\tright: ' + splittedValues[1] + ';\n\tbottom: ' + splittedValues[2] + ';\n\tleft: ' + splittedValues[3];
                                break;
                        }
                    }
                    break;
            }
            return styleKeyValue;
        }
    }]);

    return Sheet;
}();

exports.default = Sheet;