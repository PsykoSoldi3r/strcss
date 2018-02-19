"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFontLoader = parseFontLoader;
function parseFontLoader(rule) {
  var _splittedSheetText = rule.text.split(" ");
  if (_splittedSheetText.length === 2) {
    return "\n@import url('https://fonts.googleapis.com/css?family=" + _splittedSheetText[1] + "'); ";
  } else if (_splittedSheetText.length === 3) {
    return "\n@font-face {\n\tfont-family: '" + _splittedSheetText[1] + "';\n\tfont-weight: normal;\n\tsrc: url(" + _splittedSheetText[2] + "); } ";
  } else if (_splittedSheetText.length === 4) {
    return "\n@font-face {\n\tfont-family: '" + _splittedSheetText[1] + "';\n\tfont-weight: " + _splittedSheetText[2] + ";\n\tsrc: url(" + _splittedSheetText[3] + "); } ";
  }
  return "";
}