import React from 'react';
import { withRouter } from 'react-router-dom'; 

import styles from './Card.module.css';
import AddToWatchList from '../UI/AddToWatchlist/AddToWatchList';

const Card = (props) => {

    const cardClickHandler = () => {
        
        props.history.push("/result/" + props.id)
    }

    return (
        <div className={styles.Card}>
            <div className={styles.CardImage} onClick={cardClickHandler}>
                <img src={`https://image.tmdb.org/t/p/original/${props.img}`} alt="Movie Poster"/>
            </div>
            <p className={styles.CardName}>{props.name}</p>
            <div className={styles.Options}>
                <AddToWatchList type={'p'} movieId = {props.id} showNotificationHandler={props.showNotificationHandler} updateText={props.updateText}/>
                <p className={styles.ReleaseDate}>{props.releaseDate}</p>
            </div>
        </div>
    )
}

export default withRouter(Card);