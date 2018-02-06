"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PropertyHandlers = require("./PropertyHandlers");

var _Utils = require("./Utils");

var _AutoSuffixer = require("./Utils/AutoSuffixer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sheet = function () {
  function Sheet(sheet) {
    _classCallCheck(this, Sheet);

    this.css = "";
    this.map = {};

    this.parse(sheet.split("\n"));
    this.applyToDocument();
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
      var _lastMapName = "";
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
        var _out = "";
        switch (rule.type) {
          default:
          case "comment":
          case "spacing":
            break;

          case "at":
            if (_isInAt === true) _out += "} ";
            var _query = (0, _Utils.parseAt)(rule);
            _out += "} " + _query + " {";
            _out += "." + _lastMapName + " {";
            _isInAt = true;
            break;

          case "var":
            // TODO
            break;

          case "font":
            // TODO
            break;

          case "on":
            var _onName = (0, _Utils.parseOn)(rule);
            _out += "} ." + _lastMapName + ":" + _onName + " {";
            break;

          case "map":
            if (_isInMap === true) _out += "}";
            var _map = (0, _Utils.parseMap)(rule);
            _out += _map.selector + " {";
            _lastMapName = _map.name;
            _maps.push(_map.name);
            _isInMap = true;
            break;

          case "property":
            var _property = (0, _Utils.parsePropety)(rule);
            var _usedPropertyHandler = false;
            _property = (0, _AutoSuffixer.autoSuffix)(_property);
            _PropertyHandlers.PropertyHandlers.map(function (propertyHandler) {
              if (propertyHandler.propertyKey === _property.key) {
                _usedPropertyHandler = true;
                _out += propertyHandler.parse(_property);
              }
            });
            if (_usedPropertyHandler === false) _out += _property.key + ": " + _property.value + ";";
            break;
        }
        return _out;
      });

      // Last escapes!
      if (_isInMap === true) _cssLines.push("}");
      if (_isInAt === true) _cssLines.push("}");

      // Join to single string
      _css = _cssLines.join(" ");

      // Hash all the classnames
      _maps.map(function (map) {
        var _regex = new RegExp("\\." + map, "g");
        var _unique = (0, _Utils.getUnique)();
        _css = _css.replace(_regex, "." + _unique);
        _this2.map[map] = _unique;
      });

      // Thanks for coming
      this.css = _css;
    }
  }, {
    key: "applyToDocument",
    value: function applyToDocument() {
      if (typeof document === "undefined " || typeof window === "undefined") return;
      var _element = document.getElementById("strcss");
      if (typeof _element !== "undefined") {
        _element.innerHTML += this.css;
      } else {
        _element = document.createElement("style");
        _element.type = "text/css";
        _element.innerHTML = this.css;
        _element.id = "strcss";
        document.head.appendChild(_element);
      }
    }
  }]);

  return Sheet;
}();

exports.default = Sheet;