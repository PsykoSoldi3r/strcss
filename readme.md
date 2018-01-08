# Utseende

Super simple light weight inline per-component Style Sheets.

> I made this module for my own personal use. But feel free to use it if you like! 😄

```jsx
import { Sheet } from 'utseende'
import { Component } from 'react'

const sheet = new Sheet (`
    user
        padding 10px
    title
        color orange
        cursor pointer
    title:hover
        color blue
    para
        font-size 20px
`)

export class User extends Component {
    render () {
        return (
            <div className={sheet.user}>
                <div className={sheet.title}>Hello World!</div>
                <div className={sheet.para}>Cool!</div>
            </div>
        );
    }
};

```

## Numbers 
Numbers without px, %, em etc will be turned into px by default.

## Shorthands
The following shorthands are supported

```js
'pad 10'
// padding: 10px;`

'mar 10 20'
// margin: 10px 20px 10px 20px;

'pos absolute'
// position: absolute;

'ord 10'
// z-index: 10;

'gra 20 fff 212121'
// background-image: linear-gradient(20deg, #fff, #212121);

'sha 10 20 .5'
// box-shadow: 0px 0px 10px 20px rgba(0, 0, 0, 0.5);

'rec 10 20' (params just like margin)
// top: 10px; right: 20px; bottom: 10px; left: 20px;

'rec stretch'
// top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;

```
