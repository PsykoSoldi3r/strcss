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
    &:hover
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

## Properties
You can use most default CSS property as well. 
Numbers will be turned into px.

| Property | Description | Parametes |
|---|---|---|
| Rect | Positioning an element. Stretch will fill in the whole parent element. Fit will attach to the edges. | stretch / fit / directions`number` |
| Depth | Acts just like z-index when ordering layers. | depth`number` |
| Gradient | Fills the background of an element with a gradient. | degrees`number` from`color` to`color` |
| Shadow | Drops a show around an element. | blur`number` spread`number` |
