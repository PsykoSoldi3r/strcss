import { PropertyHandlers } from "./PropertyHandlers";
import {
  shift,
  getLineType,
  parseAt,
  parseMap,
  parsePropety,
  parseOn,
  getUnique,
  applyToDocument
} from "./Utils";
import { autoSuffix } from "./Utils/AutoSuffixer";

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
          if (_isInAt === true) _out += "} ";
          let _query = parseAt(rule);
          _out += `} ${_query} {`;
          _out += `${_lastMap.selector} {`;
          _isInAt = true;
          break;

        case "var":
          // TODO
          break;

        case "font":
          // TODO
          break;

        case "on":
          let _onName = parseOn(rule);
          _out += `} ${_lastMap.selector}:${_onName} {`;
          break;

        case "map":
          if (_isInMap === true) _out += "}";
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
              _out += propertyHandler.parse(_property);
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
    if (_isInMap === true) _cssLines.push("}");
    if (_isInAt === true) _cssLines.push("}");

    // Join to single string
    _css = _cssLines.join("\n");

    // Hash all the classnames
    if (this.options.hash !== false) {
      _maps.map(map => {
        var _regex = new RegExp("\\." + map, "g");
        let _unique = getUnique();
        _css = _css.replace(_regex, `.${_unique}`);
        this.map[map] = _unique;
      });
    }

    // Thanks for coming
    this.css = _css;
  }
}
