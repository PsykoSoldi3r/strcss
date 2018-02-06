import { sheetCache, uniques } from "./index";

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
    let _splittedNames = names.replace(/\s+/, "").split(",");
    let _result = "";
    _splittedNames.map(name => {
      if (typeof this.map[name] !== "undefined") {
        _result += this.map[name] + " ";
      }
    });
    return _result;
  }

  generateCSS() {
    let isScoped = false;
    let isMedia = false;
    let currentScopeUniqueID = "";
    var localVars = [];

    this.sheetRules.map(sheetRule => {
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

        this.css += `\n\n/* map ${targetName} */\n.${uniqueID} {`;
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

    let htmlStyleTag = document.createElement("style");
    htmlStyleTag.type = "text/css";
    htmlStyleTag.innerHTML = this.css;
    document.head.appendChild(htmlStyleTag);
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

    // Handle Custom Properties
    switch (styleKeyValue.key) {
      case "gradient":
        this.addSpaceSeperators(styleKeyValue, ",");
        styleKeyValue.key = "background-image";
        styleKeyValue.value = `linear-gradient(${styleKeyValue.value})`;
        break;
      case "shadow":
        styleKeyValue.key = "box-shadow";
        styleKeyValue.value = `0px 0px ${styleKeyValue.value} rgba(0,0,0,0.2)`;
        break;
      case "align":
        styleKeyValue.key = "display";
        switch (styleKeyValue.value) {
          case "left":
            styleKeyValue.value =
              "block;\n\tmargin-left: 0px;\n\tmargin-right: auto";
            break;
          case "center":
            styleKeyValue.value =
              "block;\n\tmargin-left: auto;\n\tmargin-right: auto";
            break;
          case "right":
            styleKeyValue.value =
              "block;\n\tmargin-left: auto;\n\tmargin-right: 0px";
            break;
        }
        break;
      case "order":
        styleKeyValue.key = "z-index";
        break;
      case "font":
        styleKeyValue.key = "font-family";
        styleKeyValue.value = `'${styleKeyValue.value}', sans`;
        break;
      case "alpha":
        styleKeyValue.key = "opacity";
        break;
      case "depth":
        styleKeyValue.key = "z-index";
        break;
      case "text-color":
        styleKeyValue.key = "color";
        break;
      case "scale":
        let scaleSplittedValues = styleKeyValue.value.split(" ");
        styleKeyValue.key = "transform";
        if (scaleSplittedValues.length === 2)
          styleKeyValue.value = `scale(${scaleSplittedValues[0]}, ${
            scaleSplittedValues[1]
          })`;
        else
          styleKeyValue.value = `scale(${styleKeyValue.value}, ${
            styleKeyValue.value
          })`;
        break;
      case "image":
        styleKeyValue.value = `url(${
          styleKeyValue.value
        });\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: contain`;
        styleKeyValue.key = "background-image";
        break;
      case "wallpaper":
        styleKeyValue.value = `url(${
          styleKeyValue.value
        });\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: cover`;
        styleKeyValue.key = "background-image";
        break;
      case "frostblur":
        styleKeyValue.value = `blur(${styleKeyValue.value})`;
        styleKeyValue.key = "-webkit-backdrop-filter";
        break;
      case "scroll":
        styleKeyValue.key = "margin";
        switch (styleKeyValue.value) {
          case "horizontal":
            styleKeyValue.value = `0px;\n\tpadding: 0px;\n\toverflow: auto;\n\toverflow-y: hidden;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`;
            break;
          case "vertical":
            styleKeyValue.value = `0px;\n\tpadding: 0px;\n\toverflow: scroll;\n\toverflow-x: hidden;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`;
            break;
          case "both":
            styleKeyValue.value = `0px;\n\tpadding: 0px;\n\toverflow: scroll;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`;
            break;
        }
        break;
      case "size":
        let sizeSplittedValues = styleKeyValue.value.split(" ");
        styleKeyValue.value = `${
          sizeSplittedValues[0]
        };\n\theight: ${sizeSplittedValues[1] || sizeSplittedValues[0]}`;
        styleKeyValue.key = "width";
        break;
      case "min-size":
        let minSizeSplittedValues = styleKeyValue.value.split(" ");
        styleKeyValue.value = `${
          minSizeSplittedValues[0]
        };\n\tmin-height: ${minSizeSplittedValues[1] ||
          minSizeSplittedValues[0]}`;
        styleKeyValue.key = "min-width";
        break;
      case "max-size":
        let maxSizeSplittedValues = styleKeyValue.value.split(" ");
        styleKeyValue.value = `${
          maxSizeSplittedValues[0]
        };\n\tmax-height: ${maxSizeSplittedValues[1] ||
          maxSizeSplittedValues[0]}`;
        styleKeyValue.key = "max-width";
        break;
      case "flexy":
        if (styleKeyValue.value === "row") {
          styleKeyValue.key = "display";
          styleKeyValue.value =
            "flex-direction: row;\n\tflex-wrap: nowrap;\n\tjustify-content: flex-start;\n\talign-content: stretch";
        } else if (styleKeyValue.value === "column") {
          styleKeyValue.key = "display";
          styleKeyValue.value =
            "flex-direction: row;\n\tflex-wrap: nowrap;\n\tjustify-content: flex-start;\n\talign-content: stretch";
        } else {
          styleKeyValue.key = "order";
          styleKeyValue.value = `0;\n\tflex: ${
            styleKeyValue.value
          } 1 auto;\n\talign-self: auto`;
        }
        break;
      case "rect":
        styleKeyValue.key = "top";
        if (styleKeyValue.value === "stretch") {
          styleKeyValue.value =
            "0px;\n\tleft: 0px;\n\twidth: 100%;\n\theight: 100%";
        } else if (styleKeyValue.value === "fit") {
          styleKeyValue.value =
            "0px;\n\tright: 0px;\n\tbottom: 0px;\n\tleft: 0px";
        } else {
          let splittedValues = styleKeyValue.value.split(" ");
          switch (splittedValues.length) {
            case 1:
              styleKeyValue.value = `${splittedValues[0]};\n\tright: ${
                splittedValues[0]
              };\n\tbottom: ${splittedValues[0]};\n\tleft: ${
                splittedValues[0]
              }`;
              break;
            case 2:
              styleKeyValue.value = `${splittedValues[0]};\n\tright: ${
                splittedValues[1]
              };\n\tbottom: ${splittedValues[0]};\n\tleft: ${
                splittedValues[1]
              }`;
              break;
            case 3:
              styleKeyValue.value = `${splittedValues[0]};\n\tright: ${
                splittedValues[1]
              };\n\tbottom: ${splittedValues[2]};\n\tleft: ${
                splittedValues[1]
              }`;
              break;
            case 4:
              styleKeyValue.value = `${splittedValues[0]};\n\tright: ${
                splittedValues[1]
              };\n\tbottom: ${splittedValues[2]};\n\tleft: ${
                splittedValues[3]
              }`;
              break;
          }
        }
        break;
    }
    return `\n\t${styleKeyValue.key}: ${styleKeyValue.value};`;
  }
}
