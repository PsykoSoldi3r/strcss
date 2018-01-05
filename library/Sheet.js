'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sheet = exports.Sheet = function () {
    function Sheet(componentName, ccs) {
        _classCallCheck(this, Sheet);

        this.ccs = ccs;
        this.componentName = componentName;
        this.baseName = '___INLINE_' + Math.round(Math.random() * 1000000) + '-' + this.componentName;
        this.apply();
    }

    _createClass(Sheet, [{
        key: 'apply',
        value: function apply() {
            var _this = this;

            if (typeof window.stylings === 'undefined') window.stylings = {};
            if (typeof window.stylings[this.componentName] === 'undefined') {

                var htmlStyleTag = document.createElement("style");
                var cssLines = this.ccs.split('\n');
                var output = '/* Styling for component: ' + this.componentName + ' */\n';
                var isInScope = false;

                cssLines.map(function (cssLine) {

                    if (_this.lineIsProp(cssLine) === true) {
                        output += '\n\t' + _this.getPropLine(cssLine);
                    }

                    if (_this.lineIsKey(cssLine) === true) {
                        if (isInScope === true) {
                            output += ' }\n';
                        }
                        isInScope = true;
                        output += '.' + _this.baseName + ' ' + _this.getWhitelessLine(cssLine) + ' { ';
                    }
                });
                if (isInScope === true) {
                    output += ' }\n';
                }

                console.log(output);

                htmlStyleTag.type = "text/css";
                htmlStyleTag.innerHTML = output;
                document.head.appendChild(htmlStyleTag);
            }
        }
    }, {
        key: 'lineIsProp',
        value: function lineIsProp(cssLine) {
            return cssLine[7] === ' ';
        }
    }, {
        key: 'lineIsKey',
        value: function lineIsKey(cssLine) {
            if (typeof cssLine[4] === 'string') {
                return cssLine[4] !== ' ';
            }
            return false;
        }
    }, {
        key: 'getWhitelessLine',
        value: function getWhitelessLine(cssLine) {
            return cssLine.slice(cssLine.search(/\S|$/), cssLine.length);
        }
    }, {
        key: 'getPropLine',
        value: function getPropLine(cssLine) {
            var whitelessLine = this.getWhitelessLine(cssLine);
            var splitted = whitelessLine.split(' ');
            return splitted[0] + ': ' + splitted[1] + ';';
        }
    }]);

    return Sheet;
}();