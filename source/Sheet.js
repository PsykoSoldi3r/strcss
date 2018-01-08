export class Sheet {
    constructor (css) {
        this.css = css;
        this.baseName = `___UTSEENDE_${Math.round (Math.random () * 1000000)}_${Math.round (Math.random () * 1000000)}_${Math.round (Math.random () * 1000000)}_${Math.round (Math.random () * 1000000)}___`;
        this.apply ();
    }
    apply () {
        // TODO move this to static instead of window
        if (typeof window.stylings === 'undefined')
            window.stylings = {};
        if (typeof window.stylings[this.baseName] === 'undefined') {

            let htmlStyleTag = document.createElement ("style");
            let cssLines = this.css.split ('\n');
            let output = `/* Utseende sheet: ${this.baseName} */\n`;
            let isInScope = false;

            cssLines.map (cssLine => {
                
                if (this.lineIsProp (cssLine) === true) {
                    output += '\n\t' + this.getPropLine (cssLine);
                }

                if (this.lineIsKey (cssLine) === true) {
                    if (isInScope === true) {
                        output += ' }\n';
                    }
                    isInScope = true;
                    output += `.${this.baseName} ${this.getWhitelessLine (cssLine)} { `;
                }
            });
            
            if (isInScope === true) {
                output += ' }\n'
            }

            htmlStyleTag.type = "text/css";
            htmlStyleTag.innerHTML = output;
            document.head.appendChild (htmlStyleTag);
            window.stylings[this.baseName] = htmlStyleTag;
        }
    }
    lineIsProp (cssLine) {
        return cssLine[7] === ' ';
    }
    lineIsKey (cssLine) {
        if (typeof cssLine[4] === 'string') {
            return cssLine[4] !== ' ';
        }
        return false;
    }
    getWhitelessLine (cssLine) {
        return cssLine.slice (cssLine.search(/\S|$/), cssLine.length);
    }
    getPropLine (cssLine) {
        let whitelessLine = this.getWhitelessLine (cssLine);
        let splitted = whitelessLine.split (' ');
        return `${splitted[0]}: ${splitted[1]};`;
    }
}