import {
  applyToDocument,
  getLineType,
  getUnique,
  parseAt,
  parseMap,
  parseOn,
  parsePropety,
  shift
} from "./Utils";

import { PropertyHandlers } from "./PropertyHandlers";
import { autoSuffix } from "./Utils/AutoSuffixer";
import { parseFontLoader } from "./Utils/FontLoader";

export default class Sheet {
  constructor(sheet, options) {
    this.css = "";
    this.map = {};
    this.options = options || {};

    this.parse(sheet.split("\n"));
    applyToDocument(this.css);
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
    let _lastMap = "";
    let _maps = [];

    // Lines to rules
    _rules = lines.map(line => {
      return {
        type: getLineType(shift(line)),
        text: shift(line)
      };
    });

    // Handle all types
    _cssLines = _rules.map(rule => {
      // apply vars
      _localVars.map(localVar => {
        rule.text = rule.text.replace(`{${localVar.key}}`, localVar.value);
      });

      let _out = "";
      switch (rule.type) {
        default:
        case "spacing":
          break;

        case "comment":
          if (this.options.comments === true) {
            _out += `/* ${rule.text.replace("#", "")} */ `;
          }
          break;

        case "at":
          if (_isInAt === true) _out += " } ";
          let _query = parseAt(rule);
          _out += ` } ${_query} { `;
          _out += `${_lastMap.selector} { `;
          _isInAt = true;
          break;

        case "var":
          let _splitted = rule.text.split(" ");
          _localVars.push({
            key: _splitted[1],
            value: _splitted[2]
          });
          break;

        case "font":
          let _fontLoader = parseFontLoader(rule);
          _out += _fontLoader;
          break;

        case "on":
          let _onName = parseOn(rule);
          _out += `} ${_lastMap.selector}:${_onName} { `;
          break;

        case "map":
          if (_isInMap === true) _out += " } ";
          let _map = parseMap(rule);
          _out += `${_map.selector} { `;
          _lastMap = _map;
          _maps.push(_map.name);
          _isInMap = true;
          break;

        case "property":
          let _property = parsePropety(rule);
          let _usedPropertyHandler = false;
          _property = autoSuffix(_property);
          PropertyHandlers.map(propertyHandler => {
            if (propertyHandler.propertyKey === _property.key) {
              _usedPropertyHandler = true;
              let _parsedProperies = propertyHandler.parse(_property);
              for (var _parsedPropetyKey in _parsedProperies) {
                _out += `${_parsedPropetyKey}: ${
                  _parsedProperies[_parsedPropetyKey]
                }; `;
              }
            }
          });
          if (_usedPropertyHandler === false)
            _out += `${_property.key}: ${_property.value};`;
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
      _maps.map(map => {
        var _regex = new RegExp("\\." + map + " ", "g");
        let _unique = getUnique();
        _css = _css.replace(_regex, `.${_unique} `);
        this.map[map] = _unique;
      });
    }

    // Thanks for coming
    this.css = _css;
  }
}
