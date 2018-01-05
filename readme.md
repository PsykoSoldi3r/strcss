# Utseende

Inline Style Sheets. Project for personal use, feel free to use it.

```jsx
import { Sheet } from "/Projects/NPM Packages/Utseende";
const styles = new Sheet ('user', `
    .tag
        color orange
        cursor pointer
        padding 10px
    .tag:hover
        color blue
    .test
        font-size 20px
`);

export default class User extends React.Component {
    render () {
        return (
            <div className={styles.baseName}>
                <div className='tag'>Hello World!</div>
                <div className='test'>WUT</div>
            </div>
        );
    }
};
```