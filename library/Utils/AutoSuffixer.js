"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoSuffix = autoSuffix;
exports.addNumericEndings = addNumericEndings;
function autoSuffix(property) {
  switch (property.key) {
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
      property = addNumericEndings(property, "deg");
      break;
    case "transition":
    case "transition-duration":
    case "animation":
    case "animation-duration":
      property = addNumericEndings(property, "s");
      break;
    default:
      property = addNumericEndings(property, "px");
      break;
  }
  return property;
}

function addNumericEndings(property, suffix) {
  var _parsedString = "";
  var _valueSplits = property.value.split(" ");
  _valueSplits.map(function (valueSplit) {
    var rgx = /^((\d+)?(\.\d+)?\d)$/g;
    var matches = rgx.exec(valueSplit);
    if (matches !== null) {
      valueSplit = valueSplit.replace(matches[1], "" + matches[1] + suffix);
    }
    _parsedString += valueSplit + " ";
  });
  property.value = _parsedString.substr(0, _parsedString.length - 1);
  return property;
}