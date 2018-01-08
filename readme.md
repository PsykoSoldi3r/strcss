# Utseende &middot; [![license](https://img.shields.io/badge/license-MIT-red.svg)]() [![npm](https://img.shields.io/npm/v/utseende.svg)]() [![npm](https://img.shields.io/badge/build-passing-brightgreen.svg)]() [![npm](https://img.shields.io/npm/dt/utseende.svg)]()

Utseende brings you super powers with simple, light weight, custom ruled, shorthanded, inline Sheets for styling individual components. You have three wishes 🧞‍

> Utseende is Work in progress. Feel free to contribute!

## Installation
Install using NPM
```sh
npm install utseende --save
```

3# Usage
```jsx
import { Sheet, Contants } from 'utseende'

Contants.set ({
    fontSize: 14,
    baseUrl: 'resources'
})

const sheet = new Sheet (`
    container
        position fixed
        rect stretch
        margin 20
    window
        padding 30
        size 300 200
        gradient 90 red blue
    title
        text-color orange
    button
        font-size $fontSize
        image $baseUrl/login.png
        cursor pointer
    &:hover
        text-color blue
`)

export class User extends Component {
    render () {
        return (
            <div className={sheet.map.container}>
                <div className={sheet.map.window}>
                    <div className={sheet.map.title}>Hello World!</div>
                    <div className={sheet.map.button}>LOGIN</div>
                </div>
            </div>
        );
    }
};

```

## Properties
You can use most default CSS property as well. (Some are untested, let me know if one doesnt work!)

| Property | Description | Parametes |
|---|---|---|
| rect | Positioning an element. Where stretch will fill in the whole parent element, fit will attach itself to the parents  edges. Or add up to 4 numbers acting the same as margin. | stretch / fit / directions`number` |
| depth | Acts just like z-index when ordering layers. | depth`number` |
| gradient | Fills the background of an element with a gradient. | degrees`number` from`color` to`color` |
| shadow | Drops a show around an element. | blur`number` spread`number` |
| image | Draws an image containing of the background of an element | url`string` |
| wallpaper | Fills the background of an element with an image | url`string` |
| size | The size is used to set the height and width of an element. | height`number` width`number` |
| text-color | Acts just like color when coloring text. | color`color` |

## Notes
In order to make Utseende work; target names need 4 spaces indent, properties need 8. Solo numbers will be turned into px.

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Before commiting, please compile your code using `npm run compile` and test using `npm test`, then open a pull request. Thank you very much!