import React from 'react';

import styles from './Notification.module.css';

const Notification = (props) => {

    let classes = null;

    if (props.show) {
        classes = [styles.Notification, styles.Show]
    } else {
        classes = [ styles.Notification]
    }

    return(
        <div className={classes.join(' ')}>
            <p>{props.text}</p>
        </div>
    )
}

export default Notification;