import { sheetCache, uniques } from "./index";

import { PropertyHandlers } from "./PropertyHandlers";

export default class Sheet {
  constructor(strcss) {
    this.sheetText = strcss;
    this.sheetRules = this.sheetText.split("\n");
    this.css = "";
    this.map = {};

    this.generateCSS();
    this.applyToDocument();
  }

  get(names) {
    let splittedNames = names.replace(/\s+/, "").split(",");
    let result = "";
    splittedNames.map(name => {
      if (typeof this.map[name] !== "undefined") {
        result += this.map[name] + " ";
      }
    });
    return result;
  }

  generateCSS() {
    let isScoped = false;
    let isMedia = false;
    let currentScopeUniqueID = "";
    var localVars = [];

    this.sheetRules.map((sheetRule, index) => {
      localVars.map(localVar => {
        sheetRule = sheetRule.replace(`{${localVar.key}}`, localVar.value);
      });

      // comment
      if (this.isLineComment(sheetRule) === true) return;

      // empty lines
      if (this.getLineShifted(sheetRule).length === 0) return;

      // fontface
      if (this.isLineFontface(sheetRule) === true && isScoped === false) {
        this.css += this.getLineFontface(sheetRule);
      } else if (this.isLineVar(sheetRule) === true && isScoped === false) {
        // var
        localVars.push(this.getLineVar(sheetRule));
      } else if (this.isLineMedia(sheetRule) === true) {
        // media
        if (isScoped === true) this.css += " }";
        if (isMedia === true) this.css += " }";

        let media = this.getLineMedia(sheetRule);

        this.css += `\n${media}`;

        if (isScoped === true) {
          this.css += "";
          this.css += `\n.${currentScopeUniqueID} {`;
        }

        isMedia = true;
      } else if (this.isLineApplier(sheetRule) === true && isScoped === true) {
        // applier
        let parsedApplier = this.getParsedApplier(sheetRule);

        this.css += " }";
        this.css += `\n.${currentScopeUniqueID}${parsedApplier} {`;
      } else if (this.isLineTarget(sheetRule) === true) {
        // target
        if (isScoped === true) this.css += " }";
        if (isMedia === true) {
          this.css += " }";
          isMedia = false;
        }

        let uniqueID = this.getUniqueID();
        let targetName = this.getTargetName(sheetRule);

        if (typeof this.map[targetName] !== "undefined")
          uniqueID = this.map[targetName];

        currentScopeUniqueID = uniqueID;
        isScoped = true;

        this.css += `\n.${uniqueID} { /* ${targetName} */ `;
        this.map[targetName] = uniqueID;
      } else if (isScoped === true) {
        // style
        let styleKeyValue = this.getStyleKeyValue(sheetRule);
        let parsedStyle = this.getParsedStyle(styleKeyValue);

        this.css += parsedStyle;
      }
    });

    if (isScoped === true) this.css += " }";

    if (isMedia === true) this.css += " }";
  }

  isLineFontface(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted.substring(0, 5) === "font ";
  }

  isLineTarget(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted.substring(0, 4) === "map ";
  }

  isLineApplier(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted.substring(0, 3) === "on ";
  }

  isLineVar(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted.substring(0, 4) === "var ";
  }

  isLineComment(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted[0] === "#";
  }

  isLineMedia(sheetRule) {
    let lineShifted = this.getLineShifted(sheetRule);
    return lineShifted.substring(0, 3) === "at ";
  }

  getLineVar(sheetRule) {
    sheetRule = sheetRule.replace("var ", "");
    let key = this.getLineShifted(sheetRule).split(" ")[0];
    let value = this.getLineShifted(sheetRule.replace(key, ""));
    return {
      key: key,
      value: value
    };
  }

  getLineMedia(sheetRule) {
    let mediaName = this.getLineShifted(
      this.getLineShifted(sheetRule).replace("at ", "")
    );
    let media = `@media only screen and `;

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
        media +=
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)";
        break;
    }

    media += ` { /* ${mediaName} */`;
    return media;
  }

  getParsedApplier(sheetRule) {
    let applier = this.getLineShifted(
      this.getLineShifted(sheetRule).replace("on ", "")
    );
    return `:${applier}`;
  }

  getTargetName(sheetRules) {
    return this.getLineShifted(sheetRules).replace("map ", "");
  }

  getLineShifted(sheetRules) {
    return sheetRules.replace(/^\s+|\s+$/g, "");
    // return sheetRules.slice(sheetRules.search(/\S|$/), sheetRules.length)
  }

  getUniqueID() {
    uniques.push("id");
    let id = `_u`;
    for (var i = 0; i < 3; i++)
      id += `${Math.random()
        .toString(36)
        .substr(2, 5)}${uniques.length * (i + 1)}`;
    return `${id}_`;
  }

  getStyleKeyValue(sheetText) {
    let key = this.getLineShifted(sheetText).split(" ")[0];
    let value = this.getLineShifted(sheetText.replace(key, ""));
    return {
      key: key,
      value: value
    };
  }

  getLineFontface(sheetText) {
    let splittedSheetText = this.getLineShifted(sheetText).split(" ");
    if (splittedSheetText.length === 2) {
      return `\n@import url('https://fonts.googleapis.com/css?family=${
        splittedSheetText[1]
      }');`;
    } else if (splittedSheetText.length === 3) {
      return `\n@font-face {\n\tfont-family: '${
        splittedSheetText[1]
      }';\n\tfont-weight: normal;\n\tsrc: url(${splittedSheetText[2]}); }`;
    } else if (splittedSheetText.length === 4) {
      return `\n@font-face {\n\tfont-family: '${
        splittedSheetText[1]
      }';\n\tfont-weight: ${splittedSheetText[2]};\n\tsrc: url(${
        splittedSheetText[3]
      }); }`;
    }
    return "";
  }

  addNumericEndings(styleKeyValue, suffix) {
    let parsedString = "";
    let valueSplits = styleKeyValue.value.split(" ");
    valueSplits.map(valueSplit => {
      let rgx = /^((\d+)?(\.\d+)?\d)$/g;
      let matches = rgx.exec(valueSplit);

      if (matches !== null) {
        valueSplit = valueSplit.replace(matches[1], `${matches[1]}${suffix}`);
      }
      parsedString += `${valueSplit} `;
    });
    styleKeyValue.value = parsedString.substr(0, parsedString.length - 1);
  }

  addSpaceSeperators(styleKeyValue, seperator) {
    let parsedString = "";
    let valueSplits = styleKeyValue.value.split(" ");
    valueSplits.map(valueSplit => {
      parsedString += `${valueSplit}${seperator} `;
    });
    styleKeyValue.value = parsedString.substr(
      0,
      parsedString.length - (seperator.length + 1)
    );
  }

  applyToDocument() {
    if (typeof document === "undefined " || typeof window === "undefined")
      return;
    let _htmlStyleTag = document.createElement("style");
    _htmlStyleTag.type = "text/css";
    _htmlStyleTag.innerHTML = this.css;
    document.head.appendChild(_htmlStyleTag);
  }

  getParsedStyle(styleKeyValue) {
    // Replace camel with dash
    styleKeyValue.key = styleKeyValue.key
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

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
    PropertyHandlers.map(propertyHandler => {
      if (styleKeyValue.key === propertyHandler.propertyKey) {
        styleKeyValue = propertyHandler.parse(styleKeyValue);
      }
    });

    // Handle Custom Properties
    switch (styleKeyValue.key) {
      case "rect":
        break;
    }
    return `\n\t${styleKeyValue.key}: ${styleKeyValue.value};`;
  }
}
