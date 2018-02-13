/**
 * Removes all leading and trailing
 * whitespace from a string.
 * @param {string} rule
 */
export function shift(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

/**
 * Gets the type of a rule.
 * @param {string} rule
 */
export function getLineType(rule) {
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
export function parseAt(rule) {
  let _mediaType = shift(rule.text.replace("at ", ""));
  let _out = `@media only screen and `;

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
      _out +=
        "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)";
      break;
  }
  return _out;
}

/**
 * Returns a parsed map object
 * @param {string} rule
 */
export function parseMap(rule) {
  let _splitted = rule.text.split(" ");
  if (_splitted.length === 4) {
    return {
      name: _splitted[1],
      selector: `.${_splitted[3]} .${_splitted[1]}`
    };
  }
  if (_splitted.length === 6) {
    return {
      name: _splitted[1],
      selector: `.${_splitted[3]}:${_splitted[5]} .${_splitted[1]}`
    };
  }
  return {
    name: _splitted[1],
    selector: `.${_splitted[1]}`
  };
}

/**
 * Returns the name of a on
 * @param {string} rule
 */
export function parseOn(rule) {
  return shift(rule.text.replace("on ", ""));
}

/**
 * Returns a property object
 * @param {string} rule
 */
export function parsePropety(rule) {
  let _key = rule.text
    .split(" ")[0]
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  let _value = rule.text.replace(rule.text.split(" ")[0] + " ", "");

  return {
    key: _key,
    value: _value
  };
}

/**
 * Returns a unique id
 */
export function getUnique() {
  uniqueHistory.push("id");
  let id = `_u`;
  id += Math.random()
    .toString(36)
    .substr(2, 3);
  id += uniqueHistory.length;
  id += Math.random()
    .toString(36)
    .substr(2, 3);
  return `${id}_`;
}
const uniqueHistory = [];

/**
 * Applies to document
 */
export function applyToDocument(css) {
  if (typeof document === "undefined " || typeof window === "undefined") return;
  let _element = document.getElementById("strcss");
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
