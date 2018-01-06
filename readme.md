# Utseende

Super simple light weight inline per-component Style Sheets.

> I made this module for my own personal use. But feel free to use it if you like! 😄

```jsx
import { Sheet } from "utseende";

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
`);

export default class User extends React.Component {
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
