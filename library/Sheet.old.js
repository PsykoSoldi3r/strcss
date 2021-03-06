"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./index");

var _PropertyHandlers = require("./PropertyHandlers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sheet = function () {
  function Sheet(strcss) {
    _classCallCheck(this, Sheet);

    this.sheetText = strcss;
    this.sheetRules = this.sheetText.split("\n");
    this.css = "";
    this.map = {};

    this.generateCSS();
    this.applyToDocument();
  }

  _createClass(Sheet, [{
    key: "get",
    value: function get(names) {
      var _this = this;

      var splittedNames = names.replace(/\s+/, "").split(",");
      var result = "";
      splittedNames.map(function (name) {
        if (typeof _this.map[name] !== "undefined") {
          result += _this.map[name] + " ";
        }
      });
      return result;
    }
  }, {
    key: "generateCSS",
    value: function generateCSS() {
      var _this2 = this;

      var isScoped = false;
      var isMedia = false;
      var currentScopeUniqueID = "";
      var localVars = [];

      this.sheetRules.map(function (sheetRule, index) {
        localVars.map(function (localVar) {
          sheetRule = sheetRule.replace("{" + localVar.key + "}", localVar.value);
        });

        // comment
        if (_this2.isLineComment(sheetRule) === true) return;

        // empty lines
        if (_this2.getLineShifted(sheetRule).length === 0) return;

        // fontface
        if (_this2.isLineFontface(sheetRule) === true && isScoped === false) {
          _this2.css += _this2.getLineFontface(sheetRule);
        } else if (_this2.isLineVar(sheetRule) === true && isScoped === false) {
          // var
          localVars.push(_this2.getLineVar(sheetRule));
        } else if (_this2.isLineMedia(sheetRule) === true) {
          // media
          if (isScoped === true) _this2.css += " }";
          if (isMedia === true) _this2.css += " }";

          var media = _this2.getLineMedia(sheetRule);

          _this2.css += "\n" + media;

          if (isScoped === true) {
            _this2.css += "";
            _this2.css += "\n." + currentScopeUniqueID + " {";
          }

          isMedia = true;
        } else if (_this2.isLineApplier(sheetRule) === true && isScoped === true) {
          // applier
          var parsedApplier = _this2.getParsedApplier(sheetRule);

          _this2.css += " }";
          _this2.css += "\n." + currentScopeUniqueID + parsedApplier + " {";
        } else if (_this2.isLineTarget(sheetRule) === true) {
          // target
          if (isScoped === true) _this2.css += " }";
          if (isMedia === true) {
            _this2.css += " }";
            isMedia = false;
          }

          var uniqueID = _this2.getUniqueID();
          var targetName = _this2.getTargetName(sheetRule);

          if (typeof _this2.map[targetName] !== "undefined") uniqueID = _this2.map[targetName];

          currentScopeUniqueID = uniqueID;
          isScoped = true;

          _this2.css += "\n." + uniqueID + " { /* " + targetName + " */ ";
          _this2.map[targetName] = uniqueID;
        } else if (isScoped === true) {
          // style
          var styleKeyValue = _this2.getStyleKeyValue(sheetRule);
          var parsedStyle = _this2.getParsedStyle(styleKeyValue);

          _this2.css += parsedStyle;
        }
      });

      if (isScoped === true) this.css += " }";

      if (isMedia === true) this.css += " }";
    }
  }, {
    key: "isLineFontface",
    value: function isLineFontface(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted.substring(0, 5) === "font ";
    }
  }, {
    key: "isLineTarget",
    value: function isLineTarget(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted.substring(0, 4) === "map ";
    }
  }, {
    key: "isLineApplier",
    value: function isLineApplier(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted.substring(0, 3) === "on ";
    }
  }, {
    key: "isLineVar",
    value: function isLineVar(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted.substring(0, 4) === "var ";
    }
  }, {
    key: "isLineComment",
    value: function isLineComment(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted[0] === "#";
    }
  }, {
    key: "isLineMedia",
    value: function isLineMedia(sheetRule) {
      var lineShifted = this.getLineShifted(sheetRule);
      return lineShifted.substring(0, 3) === "at ";
    }
  }, {
    key: "getLineVar",
    value: function getLineVar(sheetRule) {
      sheetRule = sheetRule.replace("var ", "");
      var key = this.getLineShifted(sheetRule).split(" ")[0];
      var value = this.getLineShifted(sheetRule.replace(key, ""));
      return {
        key: key,
        value: value
      };
    }
  }, {
    key: "getLineMedia",
    value: function getLineMedia(sheetRule) {
      var mediaName = this.getLineShifted(this.getLineShifted(sheetRule).replace("at ", ""));
      var media = "@media only screen and ";

      switch (mediaName) {
        case "mobile":
          media += "(max-width: 767px)";
          break;
        case "tablet":
          media += "(min-width: 768px) and (max-width: 991px)";
          break;
        case "desktop":
          media += "(min-width: 992px) and (max-width: 1199px)";
          break;
        case "iphonex":
          media += "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)";
          break;
      }

      media += " { /* " + mediaName + " */";
      return media;
    }
  }, {
    key: "getParsedApplier",
    value: function getParsedApplier(sheetRule) {
      var applier = this.getLineShifted(this.getLineShifted(sheetRule).replace("on ", ""));
      return ":" + applier;
    }
  }, {
    key: "getTargetName",
    value: function getTargetName(sheetRules) {
      return this.getLineShifted(sheetRules).replace("map ", "");
    }
  }, {
    key: "getLineShifted",
    value: function getLineShifted(sheetRules) {
      return sheetRules.replace(/^\s+|\s+$/g, "");
      // return sheetRules.slice(sheetRules.search(/\S|$/), sheetRules.length)
    }
  }, {
    key: "getUniqueID",
    value: function getUniqueID() {
      _index.uniques.push("id");
      var id = "_u";
      for (var i = 0; i < 3; i++) {
        id += "" + Math.random().toString(36).substr(2, 5) + _index.uniques.length * (i + 1);
      }return id + "_";
    }
  }, {
    key: "getStyleKeyValue",
    value: function getStyleKeyValue(sheetText) {
      var key = this.getLineShifted(sheetText).split(" ")[0];
      var value = this.getLineShifted(sheetText.replace(key, ""));
      return {
        key: key,
        value: value
      };
    }
  }, {
    key: "getLineFontface",
    value: function getLineFontface(sheetText) {
      var splittedSheetText = this.getLineShifted(sheetText).split(" ");
      if (splittedSheetText.length === 2) {
        return "\n@import url('https://fonts.googleapis.com/css?family=" + splittedSheetText[1] + "');";
      } else if (splittedSheetText.length === 3) {
        return "\n@font-face {\n\tfont-family: '" + splittedSheetText[1] + "';\n\tfont-weight: normal;\n\tsrc: url(" + splittedSheetText[2] + "); }";
      } else if (splittedSheetText.length === 4) {
        return "\n@font-face {\n\tfont-family: '" + splittedSheetText[1] + "';\n\tfont-weight: " + splittedSheetText[2] + ";\n\tsrc: url(" + splittedSheetText[3] + "); }";
      }
      return "";
    }
  }, {
    key: "addNumericEndings",
    value: function addNumericEndings(styleKeyValue, suffix) {
      var parsedString = "";
      var valueSplits = styleKeyValue.value.split(" ");
      valueSplits.map(function (valueSplit) {
        var rgx = /^((\d+)?(\.\d+)?\d)$/g;
        var matches = rgx.exec(valueSplit);

        if (matches !== null) {
          valueSplit = valueSplit.replace(matches[1], "" + matches[1] + suffix);
        }
        parsedString += valueSplit + " ";
      });
      styleKeyValue.value = parsedString.substr(0, parsedString.length - 1);
    }
  }, {
    key: "addSpaceSeperators",
    value: function addSpaceSeperators(styleKeyValue, seperator) {
      var parsedString = "";
      var valueSplits = styleKeyValue.value.split(" ");
      valueSplits.map(function (valueSplit) {
        parsedString += "" + valueSplit + seperator + " ";
      });
      styleKeyValue.value = parsedString.substr(0, parsedString.length - (seperator.length + 1));
    }
  }, {
    key: "applyToDocument",
    value: function applyToDocument() {
      if (typeof document === "undefined " || typeof window === "undefined") return;
      var _htmlStyleTag = document.createElement("style");
      _htmlStyleTag.type = "text/css";
      _htmlStyleTag.innerHTML = this.css;
      document.head.appendChild(_htmlStyleTag);
    }
  }, {
    key: "getParsedStyle",
    value: function getParsedStyle(styleKeyValue) {
      // Replace camel with dash
      styleKeyValue.key = styleKeyValue.key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

      // Auto suffixer
      switch (styleKeyValue.key) {
        case "depth":
        case "order":
        case "z-index":
        case "opacity":
        case "alpha":
        case "scale":
        case "transform":
        case "flex":
        case "flexy":
        case "font-weight":
          break;
        case "gradient":
        case "background-image":
          this.addNumericEndings(styleKeyValue, "deg");
          break;
        case "transition":
        case "transition-duration":
        case "animation":
        case "animation-duration":
          this.addNumericEndings(styleKeyValue, "s");
          break;
        default:
          this.addNumericEndings(styleKeyValue, "px");
          break;
      }

      // Property Handlers
      _PropertyHandlers.PropertyHandlers.map(function (propertyHandler) {
        if (styleKeyValue.key === propertyHandler.propertyKey) {
          styleKeyValue = propertyHandler.parse(styleKeyValue);
        }
      });

      // Handle Custom Properties
      switch (styleKeyValue.key) {
        case "rect":
          break;
      }
      return "\n\t" + styleKeyValue.key + ": " + styleKeyValue.value + ";";
    }
  }]);

  return Sheet;
}();

exports.default = Sheet;