import React from 'react';
import { Link } from 'react-router-dom';


const link = (props) => (

    <Link to={props.path} onClick={props.clicked}>{props.link}</Link>
    
)

export default link;