# StrCSS

[![npm](https://img.shields.io/badge/license-MIT-red.svg)]()
[![npm](https://img.shields.io/npm/v/strcss.svg)]()
[![npm](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/typescript-supported-2a507e.svg)]()
[![npm](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)]()
[![npm](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)]()
[![npm](https://img.shields.io/npm/dt/strcss.svg)]()

StrCSS (String CSS), formerly known as Utseende, brings you super powers with simple, light weight, custom ruled, shorthanded, inline Sheets for styling individual components. You're welcome, you have two wishes left... 🧞‍

<img src="https://raw.githubusercontent.com/jeffreylanters/strcss/master/resources/readme/logo.png" width="300px"><br />

[Click here for a live demo!](https://dev.jeffreylanters.nl/strcss/test/)

* [Getting started](#getting-started)
* [Features](#features)
* [How It Works](#how-it-works)
* [Sheets outside of components](#sheets-outside-of-components)
* [Variables](#variables)
  * [Internal variables](#internal-variables)
  * [Using string builders](#using-string-builders)
* [Nesting](#nesting)
* [Device targeting](#device-targeting)
* [Fonts](#fonts)
  * [Custom fonts](#custom-fonts)
  * [Google fonts](#google-fonts)
* [Numbers](Numbers)
* [Properties](#properties)
* [Contributing](#contributing)

<br/><br/><br/>

# Getting started

First install the package using NPM

```sh
npm install strcss --save
```

You can (optional) install the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=jeffreylanters.strcss-highlighting) from the Visual Studio Marketplace for syntax highlighting support!

```sh
code --install-extension jeffreylanters.strcss-highlighting
```

Now you can import `Sheet` from `strcss` and get started!

```jsx
import { Sheet } from "strcss";
import React, { Component } from "react";

const sheet = new Sheet(`
    map button
        color green
`);

export class User extends Component {
  render() {
    return <div className={sheet.map.button}>Look mom, I'm green!</div>;
  }
}
```

<br/><br/><br/>

# Features

* Complete isolation using maps
* Styles within components
* Built-in CSS shorthands
* Fast, minimal, simple
* High-performance runtime-CSS-injection
* For both browser and server
* Automatic source maps
* Auto number suffix injection
* Real-time preprocessing
* Full CSS support
* (Google) font importer
* Built-in media queries
* Expandable and customizable

<br/><br/><br/>

# How It Works

Create a sheet per component, a stylesheet will be generated per component class - NOT per component instance. When running your web application, the sheets will be injected before rendering.

Use the maps as class names. Mapped styles will be available in the map object by the name you gave them. You can also grab multiple maps using the get function as shown in the exmaple below.

```jsx
// Create a sheet...
const sheet = new Sheet(`
    map title
        fontSize 15
    at  mobile
        fontSize 10
    map button
        size 100 150
    on  hover
        scale 1.1
`)

// Get the styles from the map object
<div className={sheet.map.title} />
<div className={sheet.map.button} />

// Or grab multiple maps using the get method
<div className={sheet.get('title, button')}>
```

Will be rendered into...

```html
<style>
    ._uvxl6x84ljz716wuj6024_ { /* title */
        font-size: 15px; }
    @media only screen and (max-width: 767px) { /* mobile */
    ._uvxl6x84ljz716wuj6024_ {
        font-size: 10px; } }
    ._umzn0w91ud5g18q4j9227_ { /* button */
        width: 100px;
        height: 150px; }
    ._umzn0w91ud5g18q4j9227_:hover {
        transform: scale(1.1, 1.1); }
</style>
<div class="_uvxl6x84ljz716wuj6024_" />
<div class="_umzn0w91ud5g18q4j9227_" />
<div class="_uvxl6x84ljz716wuj6024_ _umzn0w91ud5g18q4j9227_" />
```

<br/><br/><br/>

# Sheets outside of components

You can export and import sheets to use them outside of components.

```jsx
// Styles.js
const sheet = new Sheet(``)
export { sheet }

// Component.jsx
import { sheet } from 'Styles'
sheet.map...
```

<br/><br/><br/>

# Variables

There are two ways of setting variables within your sheet.

## Internal variables

You can use the interval variable system for declaring variables. Use the var keyword, followed by the key and variable.

```jsx
const sheet = new Sheet(`
    var size 10
    map button
        fontSize {size}    -> font-size: 10px;
        zIndex {size}      -> z-index: 10;
`);
```

## Using string builders

You can also use the ES string builder for injecting variables.

```jsx
const size = 10;
const sheet = new Sheet(`
    map button
        fontSize ${size}    -> font-size: 10px;
        zIndex ${size}      -> z-index: 10;
`);
```

<br/><br/><br/>

# Nesting

Nesting allows you to manipulate maps inside other maps.

The following example turns the text in a button blue when you hover over the button.

```jsx
const sheet = new Sheet(`
    map button
        size 100 50
    map text in button
        color grey
    map text in button on hover
        color blue
`);
```

<br/><br/><br/>

# Selectors

Use the `on` keyword to apply a selector to the last created map.

```jsx
const sheet = new Sheet(`
    map button
        cursor pointer
        color blue
    on  hover
        scale 1.1

    map listItem
    on  last-child
        borderBottom 1 solid grey
`);
```

<br/><br/><br/>

# Device targeting

Use the `at` keyword within a map to target specific device.

```
const sheet = new Sheet (`
    map profilePicture
        borderRadius 50%
    at  mobile
        size 10
    at  tablet
        size 100
    at  desktop
        size 200

    at iphonex
        marginTop 100
`)
```

<br/><br/><br/>

# Fonts

Use the `font` keyword on top of your sheet to load font. The loaded font can be used in all other sheets.

## Custom fonts

You can specify just a name and path to directly load the font, or add a font weight inbetween.

```jsx
const sheet = new Sheet(`
    font sfpro bold fonts/sfpro.otf
    font arial fonts/arial.otf
    map title
        font sfpro
    map paragraph
        font arial
`);
```

## Google fonts

Another option would be to just specify a name, this will load the font directly from [Google Fonts](http://fonts.google.com).

```jsx
const sheet = new Sheet(`
    font lato
    map title
        font lato
`);
```

<br/><br/><br/>

# Numbers

Numbers will be suffixed automaticly if needed, even in variables.

```jsx
const sheet = new Sheet(`
    var num = 10
    fontSize {num}     --> font-size 10px
    zIndex {num}       --> z-index 10
    padding 20 10%     --> padding 20px 10%
`);
```

<br/><br/><br/>

# Properties

Even though you can use all the vanilla CSS properties, there are some custom properties you can use as well.

| Property   | Description                                                                                                                                                                 | Parametes                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| flexy      | Basic flex options for creating rows and columns.                                                                                                                           | row / column / grow`number`                  |
| rect       | Positioning an element. Where stretch will fill in the whole parent element, fit will attach itself to the parents edges. Or add up to 4 numbers acting the same as margin. | stretch / fit / directions`size`             |
| depth      | Acts just like z-index when ordering layers.                                                                                                                                | depth`number`                                |
| gradient   | Fills the background of an element with a gradient.                                                                                                                         | degrees`number` from`color` to`color`        |
| shadow     | Drops a show around an element.                                                                                                                                             | blur`number` spread`number`                  |
| image      | Draws an image containing of the background of an element                                                                                                                   | url`string`                                  |
| wallpaper  | Fills the background of an element with an image                                                                                                                            | url`string`                                  |
| size       | The size is used to set the height and width of an element.                                                                                                                 | height`size` width`size` / heightWidth`size` |
| min-size   | The min-size is used to set the minimal height and width of an element.                                                                                                     | height`size` width`size` / heightWidth`size` |
| max-size   | The max-size is used to set the maximal height and width of an element.                                                                                                     | height`size` width`size` / heightWidth`size` |
| text-color | Acts just like color when coloring text.                                                                                                                                    | color`color`                                 |
| frostblur  | Blurs the elements which are rendered overlapped by the target element                                                                                                      | spread`number`                               |
| scroll     | Used to add scrollbars to elements with an content that overflows (according to the parameters given for the `size`)                                                        | horizontal / vertical / both                 |
| align      | Blocks an element and aligns it relative to its parent                                                                                                                      | left / center / right                        |
| scale      | The scale increases or decreases the size of an element (according to the parameters given for the `size`).                                                                 | x`number` y`number` / xy`number`             |
| font       | To use the font for an HTML element, refer to the name of the font through the font property                                                                                | name`string`                                 |

**Types:**

* `size` The size can be set to auto (this is default. Means that the browser calculates the size), or be specified in length values, like px, cm, etc., or in percent (%) of the containing block. Single numbers will be turned into px (if posibile).
* `color` The name of a color or HEX value

<br/><br/><br/>

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. Before commiting, please compile your code using `npm run compile` and test using `npm test`, then open a pull request. Thank you very much!
