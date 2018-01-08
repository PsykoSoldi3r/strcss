import { constants, sheetCache, uniques } from './Utseende'

export default class Sheet {
    constructor (sheetText) {
        this.sheetText = this.applyContants (sheetText)
        this.sheetRules = this.sheetText.split ('\n')
        this.css = ''
        this.map = {}

        this.generateCSS ()
        this.applyToDocument ()
    }
    
    generateCSS () {
        let isScoped = false
        this.sheetRules.map (sheetRule => {
            
            if (this.isLineTarget (sheetRule) === true) {
                if (isScoped === true)
                    this.css += ' }'

                isScoped = true
                let uniqueID = this.getUniqueID ()
                let targetName = this.getTargetName (sheetRule)

                this.css += `\n/* Utseende Sheet for: ${targetName} */`
                this.css += `\n.${uniqueID} {`
                this.map[targetName] = uniqueID
            }

            else if (this.isLineStyle (sheetRule)) {
                let styleKeyValue = this.getStyleKeyValue (sheetRule)
                let parsedStyle = this.getParsedStyle (styleKeyValue)
                this.css += `\n\t${parsedStyle.key}: ${parsedStyle.value};`
            }
        })

        if (isScoped === true)
            this.css += ' }'
    }

    isLineStyle (sheetRule) {
        return sheetRule[7] === ' '
    }

    isLineTarget (sheetRule) {
        if (typeof sheetRule[4] === 'string')
            return sheetRule[4] !== ' '
        return false
    }

    getTargetName (sheetRules) {
        return this.getLineShifted (sheetRules)
    }

    getLineShifted (sheetRules) {
        return sheetRules.slice (sheetRules.search(/\S|$/), sheetRules.length)
    }

    getUniqueID () {
        uniques.push ('id')
        let id = `_UTSEENDE`
        for (var i = 0; i < 3; i++)
            id += `_${Math.round (Math.random () * 1000)}${(uniques.length * (i + 1))}`
        return `${id}_`
    }

    applyContants (sheetText) {
        for (var constantKey in constants) {
            sheetText = sheetText.replace (
                new RegExp (
                    `\\$${constantKey}`, 'g'), 
                    constants[constantKey]);
        }
        return sheetText
    }

    getStyleKeyValue (sheetText) {
        let key = this.getLineShifted (sheetText).split (' ')[0]
        let value = this.getLineShifted (sheetText.replace (key, ''))
        return {
            key: key,
            value: value
        }
    }

    addNumericEndings (styleKeyValue, suffix) {
        let parsedString = ''
        let valueSplits = styleKeyValue.value.split (' ')
        valueSplits.map (valueSplit => {
            let rgx = /^((\d+)?(\.\d+)?\d)$/g
            let matches = rgx.exec(valueSplit)

            if (matches !== null) {
                valueSplit = valueSplit.replace (
                    matches[1],
                    `${matches[1]}${suffix}`)
            }
            parsedString += `${valueSplit} `
        })
        styleKeyValue.value = parsedString.substr(0, parsedString.length - 1)
    }

    addSpaceSeperators (styleKeyValue, seperator) {
        let parsedString = ''
        let valueSplits = styleKeyValue.value.split (' ')
        valueSplits.map (valueSplit => {
            parsedString += `${valueSplit}${seperator} `
        })
        styleKeyValue.value = parsedString.substr(0, parsedString.length - (seperator.length + 1))
    }

    applyToDocument () {
        if (typeof document === 'undefined '|| typeof window === 'undefined')
            return /* node env? */

        let htmlStyleTag = document.createElement ("style");
        htmlStyleTag.type = "text/css";
        htmlStyleTag.innerHTML = this.css;
        document.head.appendChild (htmlStyleTag);
    }

    getParsedStyle (styleKeyValue) {
        switch (styleKeyValue.key) {
            case 'gradient':
            case 'background-image':
                this.addNumericEndings (styleKeyValue, 'deg')
                break
            case 'depth':
            case 'order':
            case 'z-index':
            case 'opacity':
                break
            default:
                this.addNumericEndings (styleKeyValue, 'px')
                break
        }
        switch (styleKeyValue.key) {
            case 'gradient':
                this.addSpaceSeperators (styleKeyValue, ',')
                styleKeyValue.key = 'background-image'
                styleKeyValue.value = `linear-gradient(${styleKeyValue.value})`
                break
            case 'shadow':
                styleKeyValue.key = 'box-shadow'
                styleKeyValue.value = `0px 0px ${styleKeyValue.value} rgba(0,0,0,0.5)`
                break
            case 'order':
                styleKeyValue.key = 'z-index'
                break
            case 'text-color':
                styleKeyValue.key = 'color'
                break
            case 'image':
                styleKeyValue.value = `url(${styleKeyValue.value});\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: contain`
                styleKeyValue.key = 'background-image'
                break
            case 'wallpaper':
                styleKeyValue.value = `url(${styleKeyValue.value});\n\tbackground-position: center;\n\tbackground-repeat: no-repeat;\n\tbackground-size: cover`
                styleKeyValue.key = 'background-image'
                break
            case 'size':
                let splittedValues = styleKeyValue.value.split (' ')
                styleKeyValue.value = `${splittedValues[0]};\n\theight: ${splittedValues[1]}`
                styleKeyValue.key = 'width'
                break
            case 'rect':
                styleKeyValue.key = 'top'
                if (styleKeyValue.value === 'stretch') {
                    styleKeyValue.value = '0px;\n\tleft: 0px;\n\twidth: 100%;\n\theight: 100%'
                } 
                else if (styleKeyValue.value === 'fit') {
                    styleKeyValue.value = '0px;\n\tright: 0px;\n\tbottom: 0px;\n\tleft: 0px'
                }
                else {
                    let splittedValues = styleKeyValue.value.split (' ')
                    switch (splittedValues.length) {
                        case 1:
                            styleKeyValue.value = `${splittedValues[0]};\n\tright: ${splittedValues[0]};\n\tbottom: ${splittedValues[0]};\n\tleft: ${splittedValues[0]}`
                            break
                        case 2:
                            styleKeyValue.value = `${splittedValues[0]};\n\tright: ${splittedValues[1]};\n\tbottom: ${splittedValues[0]};\n\tleft: ${splittedValues[1]}`
                            break
                        case 3:
                            styleKeyValue.value = `${splittedValues[0]};\n\tright: ${splittedValues[1]};\n\tbottom: ${splittedValues[2]};\n\tleft: ${splittedValues[1]}`
                            break
                        case 4:
                            styleKeyValue.value = `${splittedValues[0]};\n\tright: ${splittedValues[1]};\n\tbottom: ${splittedValues[2]};\n\tleft: ${splittedValues[3]}`
                            break
                    }
                }
                break
        }
        return styleKeyValue
    }
}