module.exports.drawSeperator = function(text) {
  let _text = " " + text.toUpperCase() + " ";
  let _size = process.stdout.columns;
  let _out = "\n\x1b[7m";
  let _textPosStart = Math.round(_size / 2) - Math.round(_text.length / 2);
  let _textPosEnd = _textPosStart + _text.length;
  for (let i = 0; i < _size; i++) {
    _out += "=";
  }
  _out += "\n";
  for (let i = 0; i < _size; i++) {
    if (i === _textPosStart) {
      _out += _text;
      i += _text.length - 1;
    } else {
      _out += "=";
    }
  }
  _out += "\n\x1b[0m";
  console.log(_out);
};

module.exports.drawSpacing = function(size) {
  for (let i = 0; i < size; i++) {
    console.log("\n");
  }
};
