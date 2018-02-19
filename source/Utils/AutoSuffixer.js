export function autoSuffix(property) {
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
    case "flex-shrink":
    case "flex-grow":
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

export function addNumericEndings(property, suffix) {
  let _parsedString = "";
  let _valueSplits = property.value.split(" ");
  _valueSplits.map(valueSplit => {
    let rgx = /^((\d+)?(\.\d+)?\d)$/g;
    let matches = rgx.exec(valueSplit);
    if (matches !== null) {
      valueSplit = valueSplit.replace(matches[1], `${matches[1]}${suffix}`);
    }
    _parsedString += `${valueSplit} `;
  });
  property.value = _parsedString.substr(0, _parsedString.length - 1);
  return property;
}
