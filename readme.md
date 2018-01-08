# Utseende

Super simple light weight inline per-component Style Sheets.

> I made this module for my own personal use. But feel free to use it if you like! 😄

```jsx
import { Sheet, Contants } from 'utseende'

Contants.set ({
    fontSize: 10
})

const sheet = new Sheet (`
    user
        padding 10
        rect stretch
        shadow 10 20
    title
        text-color orange
        cursor pointer
    title:hover
        text-color blue
    para
        font-size $fontSize
`)

export class User extends Component {
    render () {
        return (
            <div className={sheet.map.user}>
                <div className={sheet.map.title}>Hello World!</div>
                <div className={sheet.map.para}>Cool!</div>
            </div>
        );
    }
};

```

## Numbers 
Numbers without px, %, em etc will be turned into px by default.

## All tested values
Other default css values will work as well but are not tested!

```js
'depth 10'

'gradient 20 #fff #212121'

'shadow 10 20'

'rect stretch'
'rect fit'
'rect 10'

```
