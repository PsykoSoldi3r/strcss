"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shift = shift;
exports.getLineType = getLineType;
exports.parseAt = parseAt;
exports.parseMap = parseMap;
exports.parseOn = parseOn;
exports.parsePropety = parsePropety;
exports.getUnique = getUnique;
exports.applyToDocument = applyToDocument;
/**
 * Removes all leading and trailing
 * whitespace from a string.
 * @param {string} rule
 */
function shift(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

/**
 * Gets the type of a rule.
 * @param {string} rule
 */
function getLineType(rule) {
  if (rule.length === 0) {
    return "spacing";
  }
  if (rule[0] === "#") {
    return "comment";
  }
  if (rule.substring(0, 4) === "map ") {
    return "map";
  }
  if (rule.substring(0, 4) === "var ") {
    return "var";
  }
  if (rule.substring(0, 3) === "at ") {
    return "at";
  }
  if (rule.substring(0, 3) === "on ") {
    return "on";
  }
  if (rule.substring(0, 5) === "font ") {
    return "font";
  }
  return "property";
}

/**
 * Returns the media query
 * @param {string} rule
 */
function parseAt(rule) {
  var _mediaType = shift(rule.text.replace("at ", ""));
  var _out = "@media only screen and ";

  switch (_mediaType) {
    case "mobile":
      _out += "(max-width: 767px)";
      break;
    case "tablet":
      _out += "(min-width: 768px) and (max-width: 991px)";
      break;
    case "desktop":
      _out += "(min-width: 992px) and (max-width: 1199px)";
      break;
    case "iphonex":
      _out += "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)";
      break;
  }
  return _out;
}

/**
 * Returns a parsed map object
 * @param {string} rule
 */
function parseMap(rule) {
  var _splitted = rule.text.split(" ");
  if (_splitted.length === 4) {
    return {
      name: _splitted[1],
      selector: "." + _splitted[3] + " ." + _splitted[1]
    };
  }
  if (_splitted.length === 6) {
    return {
      name: _splitted[1],
      selector: "." + _splitted[3] + ":" + _splitted[5] + " ." + _splitted[1]
    };
  }
  return {
    name: _splitted[1],
    selector: "." + _splitted[1]
  };
}

/**
 * Returns the name of a on
 * @param {string} rule
 */
function parseOn(rule) {
  return shift(rule.text.replace("on ", ""));
}

/**
 * Returns a property object
 * @param {string} rule
 */
function parsePropety(rule) {
  var _key = rule.text.split(" ")[0].replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  var _value = rule.text.replace(rule.text.split(" ")[0] + " ", "");

  return {
    key: _key,
    value: _value
  };
}

/**
 * Returns a unique id
 */
function getUnique() {
  uniqueHistory.push("id");
  var id = "_u";
  id += Math.random().toString(36).substr(2, 3);
  id += uniqueHistory.length;
  id += Math.random().toString(36).substr(2, 3);
  return id + "_";
}
var uniqueHistory = [];

/**
 * Applies to document
 */
function applyToDocument(css) {
  if (typeof document === "undefined " || typeof window === "undefined") return;
  var _element = document.getElementById("strcss");
  if (_element !== null) {
    _element.innerHTML += css;
  } else {
    _element = document.createElement("style");
    _element.type = "text/css";
    _element.innerHTML = css;
    _element.id = "strcss";
    document.head.appendChild(_element);
  }
}