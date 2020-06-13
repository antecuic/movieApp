import React from 'react';
import styles from './Input.module.css';

const input = (props) => (

    <input className={styles.Input} type={props.type} name={props.name} placeholder={props.placeholder} required onChange={props.onChange}/>
)

export default input;