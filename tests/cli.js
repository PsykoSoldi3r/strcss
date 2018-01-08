const ReadLine = require('readline')
const { Constants, Sheet } = require('../')

let sheet = new Sheet ('')
let readLineInterface = ReadLine.createInterface ({ input: process.stdin, output: process.stdout })
let test = _ => {
    readLineInterface.question ('Enter a rule to test: ', rule => {
        console.log (sheet.getParsedStyle (sheet.getStyleKeyValue (rule)) + '\n')
        test ()
    })
}
test ()