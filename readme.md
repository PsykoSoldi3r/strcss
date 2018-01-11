# StrCSS &middot; [![license](https://img.shields.io/badge/license-MIT-red.svg)]() [![npm](https://img.shields.io/npm/v/strcss.svg)]() [![npm](https://img.shields.io/badge/build-passing-brightgreen.svg)]() [![npm](https://img.shields.io/npm/dt/strcss.svg)]()

(formerly known as Utseende)

StrCSS brings you super powers with simple, light weight, custom ruled, shorthanded, inline Sheets for styling individual components. You're welcome, you have two wishes left... 🧞‍

<img src="https://raw.githubusercontent.com/jeffreylanters/strcss/master/resources/readme/logo.png" width="300px"><br />

[Click here for a live demo!](https://dev.jeffreylanters.nl/strcss/test/)


- [Installation](#installation)
- [Usage](#usage)
- [Keywords](#keywords)
    - [Selectors](#selectors)
    - [Media Queries](#media-queries)
    - [Fonts](#fonts)
    - [Vars](#vars)
    - [Comments](#comments)
- [Numbers](Numbers)
- [Properties](#properties)
- [Contributing](#contributing)

<br/><br/><br/>
# Installation
Install using NPM
```sh
npm install strcss --save
```

<br/><br/><br/>
# Usage
```jsx
import { Sheet } from 'strcss'
import React, { Component } from 'react'

const sheet = new Sheet (`
    var base public/resources

    font lato {base}/fonts/lato.otf
    
    map container
        position fixed
        rect fit
        size 50% 500
    at  mobile
        max-size 20% 400

    map button
        image {base}/login.png
        font-size 20
    on  hover
        scale 1.1
`)

export class User extends Component {
    render () {
        return (
            <div className={sheet.map.container}>
                <div className={sheet.map.button}>Login</div>
            </div>
        )
    }
}
```

<br/><br/><br/>
# Keywords

## Selectors
Use the `on` keyword to apply a selector
```jsx
const sheet = new Sheet (`
    map button
        cursor pointer
        color blue
    on  hover
        scale 1.1

    map listItem
    on  last-child
        border-bottom 1 solid grey
`)
```

## Media Queries
Use the `at` keyword within a map to apply one of the three media queries.
`mobile, tablet and desktop`.
```jsx
const sheet = new Sheet (`
    map profilePicture
        border-radius 50%
    at  mobile
        size 10
    at  tablet
        size 100
    at  desktop
        size 200
`)
```

## Fonts
Use the `font` keyword on top of your sheet to load font. When specifing just a name, the font will be loaded from Google Fonts.
```jsx
const sheet = new Sheet (`
    font sfpro bold fonts/sfpro.otf
    font arial fonts/arial.otf
    font Lato
`)
```

## Vars
Use the `var` keyword on to declarate an var.
```jsx
const sheet = new Sheet (`
    var base public/resources
    font sfpro bold {base}/sfpro.otf
    map picture
        image {base}/dog.png
`)
```

## Comments
Use the `#` keyword to place comments.
```jsx
const sheet = new Sheet (`
    # global font size
    var fs 10
`)
```

<br/><br/><br/>
# Numbers
Numbers will automaticly be changes into px when needed.
```jsx
const sheet = new Sheet (`
    var num = 10
    font-size {num}     --> font-size 10px
    z-index {num}       --> z-index 10
    padding 20 10%      --> padding 20px 10%
`)
```

<br/><br/><br/>
# Properties
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
| font | To use the font for an HTML element, refer to the name of the font through the font property | name`string` |

**Types:**
- `size` The size can be set to auto (this is default. Means that the browser calculates the size), or be specified in length values, like px, cm, etc., or in percent (%) of the containing block. Single numbers will be turned into px (if posibile).
- `color` The name of a color or HEX value

<br/><br/><br/>
# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Before commiting, please compile your code using `npm run compile` and test using `npm test`, then open a pull request. Thank you very much!