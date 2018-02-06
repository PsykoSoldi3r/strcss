import { PropertyHandlers } from "./PropertyHandlers";
import {
  shift,
  getLineType,
  parseAt,
  parseMap,
  parsePropety,
  parseOn,
  getUnique
} from "./Utils";
import { autoSuffix } from "./Utils/AutoSuffixer";

export default class Sheet {
  constructor(sheet) {
    this.css = "";
    this.map = {};

    this.parse(sheet.split("\n"));
    this.applyToDocument();
  }

  get(names) {
    let _splittedNames = names.replace(/\s+/, "").split(",");
    let _result = "";
    _splittedNames.map(name => {
      if (typeof this.map[name] !== "undefined") {
        _result += this.map[name] + " ";
      }
    });
    return _result;
  }

  parse(lines) {
    let _css = "";
    let _rules = [];
    let _cssLines = [];
    let _isInMap = false;
    let _isInAt = false;
    let _localVars = [];
    let _lastMapName = "";
    let _maps = [];

    /**
     * Convert all the rules to rule objects
     * so we can parse them easier.
     */
    _rules = lines.map(line => {
      return {
        type: getLineType(shift(line)),
        text: shift(line)
      };
    });

    /**
     * Handle all the rules and put them in
     * the css object.
     */
    _cssLines = _rules.map(rule => {
      let _out = "";
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
          let _query = parseAt(rule);
          _out += `} ${_query} {`;
          _out += `.${_lastMapName} {`;
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
          let _onName = parseOn(rule);
          _out += `} .${_lastMapName}:${_onName} {`;
          break;

        /**
         * MAP
         */
        case "map":
          if (_isInMap === true) _out += "}";
          _isInMap = true;
          let _mapName = parseMap(rule);
          _out += `.${_mapName} {`;
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
          let _property = parsePropety(rule);
          let _usedPropertyHandler = false;
          _property = autoSuffix(_property);
          PropertyHandlers.map(propertyHandler => {
            if (propertyHandler.propertyKey === _property.key) {
              _usedPropertyHandler = true;
              _out += propertyHandler.parse(_property);
            }
          });
          if (_usedPropertyHandler === false)
            _out += `${_property.key}: ${_property.value};`;
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
    _maps.map(map => {
      var _findMap = `.${map}`;
      var _regex = new RegExp(_findMap, "g");
      let _unique = getUnique();

      _css = _css.replace(_regex, `.${_unique}`);
      this.map[map] = _unique;
    });

    // Thanks for coming
    this.css = _css;
  }

  applyToDocument() {
    if (typeof document === "undefined " || typeof window === "undefined")
      return;

    let htmlStyleTag = document.createElement("style");
    htmlStyleTag.type = "text/css";
    htmlStyleTag.innerHTML = this.css;
    document.head.appendChild(htmlStyleTag);
  }
}
