import React from 'react';
import { withRouter } from 'react-router-dom'
import styles from './Hamburger.module.css';

const Hamburger = (props) => {

    let classes = [styles.Hamburger, styles.Bright];

    const { history } = props;

    if (history.location['pathname'] === "/") {
        classes = [styles.Hamburger, styles.Bright]
    }


    return(

        <div className={styles.Icon} onClick={props.clicked}>
            <div className={classes.join(' ')}></div>
        </div>
    );

}

export default withRouter(Hamburger);
