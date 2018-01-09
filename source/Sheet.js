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
                this.css += parsedStyle
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
            return

        let htmlStyleTag = document.createElement ("style");
        htmlStyleTag.type = "text/css";
        htmlStyleTag.innerHTML = this.css;
        document.head.appendChild (htmlStyleTag);
    }

    getParsedStyle (styleKeyValue) {
        switch (styleKeyValue.key) {
            case 'depth':
            case 'order':
            case 'z-index':
            case 'opacity':
            case 'flex':
                break
            case 'gradient':
            case 'background-image':
                this.addNumericEndings (styleKeyValue, 'deg')
                break
            case 'transition':
            case 'transition-duration':
            case 'animation':
            case 'animation-duration':
                this.addNumericEndings (styleKeyValue, 's')
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
            case 'align':
                styleKeyValue.key = 'display'
                switch (styleKeyValue.value) {
                    case 'left':
                        styleKeyValue.value = 'block;\n\tmargin-left: 0px;\n\tmargin-right: auto'
                        break
                    case 'center':
                        styleKeyValue.value = 'block;\n\tmargin-left: auto;\n\tmargin-right: auto'
                        break
                    case 'right':
                        styleKeyValue.value = 'block;\n\tmargin-left: auto;\n\tmargin-right: 0px'
                        break
                }
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
            case 'frostblur':
                styleKeyValue.value = `blur(${styleKeyValue.value})`
                styleKeyValue.key = '-webkit-backdrop-filter'
                break
            case 'scroll':
                styleKeyValue.key = 'margin'
                switch (styleKeyValue.value) {
                    case 'horizontal':
                        styleKeyValue.value = `0px;\n\tpadding: 0px\n\toverflow: auto;\n\toverflow-y: hidden;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`
                        break
                    case 'vertical':
                        styleKeyValue.value = `0px;\n\tpadding: 0px\n\toverflow: scroll;\n\toverflow-x: hidden;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`
                        break
                    case 'both':
                        styleKeyValue.value = `0px;\n\tpadding: 0px\n\toverflow: scroll;\n\twhite-space: nowrap;\n\t-webkit-overflow-scrolling: touch`
                        break
                }
                break
            case 'size':
                let sizeSplittedValues = styleKeyValue.value.split (' ')
                styleKeyValue.value = `${sizeSplittedValues[0]};\n\theight: ${sizeSplittedValues[1] || sizeSplittedValues[0]}`
                styleKeyValue.key = 'width'
                break
            case 'min-size':
                let minSizeSplittedValues = styleKeyValue.value.split (' ')
                styleKeyValue.value = `${minSizeSplittedValues[0]};\n\tmin-height: ${minSizeSplittedValues[1] || minSizeSplittedValues[0]}`
                styleKeyValue.key = 'min-width'
                break
            case 'max-size':
                let maxSizeSplittedValues = styleKeyValue.value.split (' ')
                styleKeyValue.value = `${maxSizeSplittedValues[0]};\n\tmax-height: ${maxSizeSplittedValues[1] || maxSizeSplittedValues[0]}`
                styleKeyValue.key = 'max-width'
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
        return `\n\t${styleKeyValue.key}: ${styleKeyValue.value};`
    }
}