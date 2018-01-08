const { Utseende, Sheet } = require('./')

Utseende.registerConstant({ 
    'fontSize': '10'
})

let sheet = new Sheet(`
    container
        position fixed
        rect sretch
        gradient 20 fff 191919
    user
        font-size $fontSize
        text-color blue
    user:hover
        text-color red
`);

console.log(sheet);