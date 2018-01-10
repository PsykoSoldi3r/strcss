# Utseende &middot; [![license](https://img.shields.io/badge/license-MIT-red.svg)]() [![npm](https://img.shields.io/npm/v/utseende.svg)]() [![npm](https://img.shields.io/badge/build-passing-brightgreen.svg)]() [![npm](https://img.shields.io/npm/dt/utseende.svg)]()

Utseende brings you super powers with simple, light weight, custom ruled, shorthanded, inline Sheets for styling individual components. You're welcome, you have three wishes left... 🧞‍

> Utseende is Work in progress, big changes may be made during new versions. Feel free to contribute!

## Installation
Install using NPM
```sh
npm install utseende --save
```

## Example usage
[Click here for a live demo of the script below!](https://dev.jeffreylanters.nl/utseende/test/)
```jsx
import { Sheet } from 'utseende'

const sheet = new Sheet (`

    var base public_html/resources

    font sfpro bold {base}/fonts/sfpro.otf
    font arial {base}/fonts/arial.otf

    for container
        position fixed
        rect stretch
        gradient 90 red blue
        font sfpro
    for window
        size 100%
        max-size 300 200
        padding 20
    and closed
        display none
    for title
    for text
        color #333
    for title
        font-size 20
    for profilePicture
        size 100
        align center
        image {base}/login.png
        cursor pointer
    for button
        cursor pointer
    and hover
        scale 1.1
`)

export class User extends Component {
    render () {
        return (
            <div className={sheet.map.container}>
                <div className={sheet.map.window}>
                    <div className={sheet.map.profilePicture} />
                    <div className={sheet.map.title}>Hello World!</div>
                    <div className={sheet.map.text}>How are you?</div>
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
| rect | Positioning an element. Where stretch will fill in the whole parent element, fit will attach itself to the parents  edges. Or add up to 4 numbers acting the same as margin. | stretch / fit / directions`size` |
| depth | Acts just like z-index when ordering layers. | depth`number` |
| gradient | Fills the background of an element with a gradient. | degrees`number` from`color` to`color` |
| shadow | Drops a show around an element. | blur`number` spread`number` |
| image | Draws an image containing of the background of an element | url`string` |
| wallpaper | Fills the background of an element with an image | url`string` |
| size | The size is used to set the height and width of an element. | height`size` width`size` / heightWidth`size` |
| min-size | The min-size is used to set the minimal height and width of an element. | height`size` width`size` / heightWidth`size` |
| max-size | The max-size is used to set the maximal height and width of an element. | height`size` width`size` / heightWidth`size` |
| text-color | Acts just like color when coloring text. | color`color` |
| frostblur | Blurs the elements which are rendered overlapped by the target element | spread`number` |
| scroll | Used to add scrollbars to elements with an content that overflows (according to the parameters given for the `size`) | horizontal / vertical / both |
| align | Blocks an element and aligns it relative to its parent | left / center / right |
| scale | The scale increases or decreases the size of an element (according to the parameters given for the `size`). | x`number` y`number` / xy`number` |
| font | To use the font for an HTML element, refer to the name of the font (myFirstFont) through the font property | name`string` |

**Types:**
- `size` The size can be set to auto (this is default. Means that the browser calculates the size), or be specified in length values, like px, cm, etc., or in percent (%) of the containing block. Single numbers will be turned into px (if posibile).
- `color` The name of a color or HEX value

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Before commiting, please compile your code using `npm run compile` and test using `npm test`, then open a pull request. Thank you very much!