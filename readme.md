# Utseende 

Super simple light weight inline Sheets with custom rules for styling components. I made this module for my own personal use. But feel free to use it if you like! 🍦

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
| rect | Positioning an element. Where stretch will fill in the whole parent element, fit will attach itself to the parents  edges. Or add up to 4 numbers acting the same as margin. | stretch / fit / directions`number` |
| depth | Acts just like z-index when ordering layers. | depth`number` |
| gradient | Fills the background of an element with a gradient. | degrees`number` from`color` to`color` |
| shadow | Drops a show around an element. | blur`number` spread`number` |
