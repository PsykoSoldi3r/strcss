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

## Sheet Rules
You can use other default CSS rules as well. Numbers will be turned into px.

### Rect
Positioning an element. Stretch will fill in the whole parent element. Fit will attach to the edges.
```
rect stretch
rect fit
rect {all directions: int}
rect {top bottom directions: int} {right left directions: int}
rect {top direction: int} {right left directions: int} {bottom direction: int}
rect {top direction: int} {right direction: int} {bottom direction: int} {left direction: int}
```

### Depth
Acts just like z-index when ordering layers.
```
depth {layer: int}
```

### Gradient
Fills the background of an element with a gradient.
```
gradient {degrees: int} {from: color} {to: color}
```

### Shadow
Drops a show around an element.
```
shadow {blur: float} {spread: float}
```
