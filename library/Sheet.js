"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require("./Utils");

var _PropertyHandlers = require("./PropertyHandlers");

var _AutoSuffixer = require("./Utils/AutoSuffixer");

var _FontLoader = require("./Utils/FontLoader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sheet = function () {
  function Sheet(sheet, options) {
    _classCallCheck(this, Sheet);

    this.css = "";
    this.map = {};
    this.options = options || {};

    this.parse(sheet.split("\n"));
    (0, _Utils.applyToDocument)(this.css);
  }

  _createClass(Sheet, [{
    key: "get",
    value: function get(names) {
      var _this = this;

      var _splittedNames = names.replace(/\s+/, "").split(",");
      var _result = "";
      _splittedNames.map(function (name) {
        if (typeof _this.map[name] !== "undefined") {
          _result += _this.map[name] + " ";
        }
      });
      return _result;
    }
  }, {
    key: "parse",
    value: function parse(lines) {
      var _this2 = this;

      var _css = "";
      var _rules = [];
      var _cssLines = [];
      var _isInMap = false;
      var _isInAt = false;
      var _localVars = [];
      var _lastMap = "";
      var _maps = [];

      // Lines to rules
      _rules = lines.map(function (line) {
        return {
          type: (0, _Utils.getLineType)((0, _Utils.shift)(line)),
          text: (0, _Utils.shift)(line)
        };
      });

      // Handle all types
      _cssLines = _rules.map(function (rule) {
        // apply vars
        _localVars.map(function (localVar) {
          rule.text = rule.text.replace("{" + localVar.key + "}", localVar.value);
        });

        var _out = "";
        switch (rule.type) {
          default:
          case "spacing":
            break;

          case "comment":
            if (_this2.options.comments === true) {
              _out += "/* " + rule.text.replace("#", "") + " */ ";
            }
            break;

          case "at":
            if (_isInAt === true) _out += " } ";
            var _query = (0, _Utils.parseAt)(rule);
            _out += " } " + _query + " { ";
            _out += _lastMap.selector + " { ";
            _isInAt = true;
            break;

          case "var":
            var _splitted = rule.text.split(" ");
            _localVars.push({
              key: _splitted[1],
              value: _splitted[2]
            });
            break;

          case "font":
            var _fontLoader = (0, _FontLoader.parseFontLoader)(rule);
            _out += _fontLoader;
            break;

          case "on":
            var _onName = (0, _Utils.parseOn)(rule);
            _out += "} " + _lastMap.selector + ":" + _onName + " { ";
            break;

          case "map":
            if (_isInMap === true) _out += " } ";
            if (_isInAt === true) _out += " } ";
            var _map = (0, _Utils.parseMap)(rule);
            _out += _map.selector + " { ";
            _lastMap = _map;
            if (_maps.indexOf(_map.name) === -1) _maps.push(_map.name);
            _isInMap = true;
            _isInAt = false;
            break;

          case "property":
            var _property = (0, _Utils.parsePropety)(rule);
            var _usedPropertyHandler = false;
            _property = (0, _AutoSuffixer.autoSuffix)(_property);
            _PropertyHandlers.PropertyHandlers.map(function (propertyHandler) {
              if (propertyHandler.propertyKey === _property.key) {
                _usedPropertyHandler = true;
                var _parsedProperies = propertyHandler.parse(_property);
                for (var _parsedPropetyKey in _parsedProperies) {
                  _out += _parsedPropetyKey + ": " + _parsedProperies[_parsedPropetyKey] + "; ";
                }
              }
            });
            if (_usedPropertyHandler === false) _out += _property.key + ": " + _property.value + ";";
            break;
        }

        // Return what we made!
        return _out;
      });

      // Last escapes!
      if (_isInMap === true) _cssLines.push(" }");
      if (_isInAt === true) _cssLines.push(" }");

      // Join to single string
      _css = _cssLines.join(" ");

      // Hash all the classnames
      if (this.options.hash !== false) {
        console.log(_maps);
        _maps.map(function (map) {
          var _unique = (0, _Utils.getUnique)();
          _css = _css.replace(new RegExp("\\." + map + " ", "g"), "." + _unique + " ");
          _css = _css.replace(new RegExp("\\." + map + ":", "g"), "." + _unique + ":");
          _this2.map[map] = _unique;
        });
      }

      // Thanks for coming
      this.css = _css;
    }
  }]);

  return Sheet;
}();

exports.default = Sheet;