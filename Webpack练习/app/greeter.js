/**
 * Created by GG on 16/9/20.
 */

import React, {Component} from 'react';
import config from './config.json';
import styles from './greeter.css';

class Greeter extends Component {
    render() {
        return (
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}

export default Greeter