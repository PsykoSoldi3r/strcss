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

      /**
       * Convert all the rules to rule objects
       * so we can parse them easier.
       */
      _rules = lines.map(function (line) {
        return {
          type: (0, _Utils.getLineType)((0, _Utils.shift)(line)),
          text: (0, _Utils.shift)(line)
        };
      });

      /**
       * Handle all the rules and put them in
       * the css object.
       */
      _cssLines = _rules.map(function (rule) {
        var _out = "";
        switch (rule.type) {
          /**
           * SPACING
           * Comments and empty lines will be
           * ignored while parsing.
           */
          default:
          case "comment":
          case "spacing":
            break;

          /**
           * AT
           * Leaved the last map and the last at
           * if needed and wraps itself in a media
           * query.
           */
          case "at":
            if (_isInAt === true) _out += "} ";
            var _query = (0, _Utils.parseAt)(rule);
            _out += "} " + _query + " {";
            _out += "." + _lastMapName + " {";
            _isInAt = true;
            break;

          /**
           * VAR
           */
          case "var":
            // TODO
            break;

          /**
           * FONT
           */
          case "font":
            // TODO
            break;

          /**
           * ON
           * Leaves the last map and applies a
           * selector to the current map.
           */
          case "on":
            var _onName = (0, _Utils.parseOn)(rule);
            _out += "} ." + _lastMapName + ":" + _onName + " {";
            break;

          /**
           * MAP
           */
          case "map":
            if (_isInMap === true) _out += "}";
            _isInMap = true;
            var _mapName = (0, _Utils.parseMap)(rule);
            _out += "." + _mapName + " {";
            _lastMapName = _mapName;
            _maps.push(_mapName);
            break;

          /**
           * PROPERTY
           * Tries all the property handles to match
           * the properies key. If there is no match
           * the property will be added like normal
           * css styles.
           */
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

      // Randomize all the classnames
      _maps.map(function (map) {
        var _findMap = "." + map;
        var _regex = new RegExp(_findMap, "g");
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

      var htmlStyleTag = document.createElement("style");
      htmlStyleTag.type = "text/css";
      htmlStyleTag.innerHTML = this.css;
      document.head.appendChild(htmlStyleTag);
    }
  }]);

  return Sheet;
}();

exports.default = Sheet;