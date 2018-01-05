export class Sheet {
    constructor (componentName, ccs) {
        this.ccs = ccs;
        this.componentName = componentName;
        this.baseName = `___INLINE_${Math.round (Math.random () * 1000000)}-${this.componentName}`;
        this.apply ();
    }
    apply () {
        if (typeof window.stylings === 'undefined')
            window.stylings = {};
        if (typeof window.stylings[this.componentName] === 'undefined') {

            let htmlStyleTag = document.createElement ("style");
            let cssLines = this.ccs.split ('\n');
            let output = `/* Styling for component: ${this.componentName} */\n`;
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

            console.log (output);
            
            htmlStyleTag.type = "text/css";
            htmlStyleTag.innerHTML = output;
            document.head.appendChild (htmlStyleTag);
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