import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Card from '../Card/Card';
import Loader from '../UI/Loader/Loader';
import SearchForm from '../SearchForm/SearchForm';
import { withRouter } from 'react-router-dom'

import styles from './Watchlist.module.css'

import Axios from 'axios';

const Watchlist = (props) => {

    const [isLoading, setIsloading] = useState(true);
    const [ movieData, setMovieData ] = useState([]);

    const user = useContext(AuthContext);
    let uid = null;

    if (user) {
        uid = user.uid
    } else {
        props.history.push("/");
    }

    useEffect(() => {

        Axios.get(`https://react-quizapp-bbc13.firebaseio.com/users/${uid}/watchlist.json`)
            .then(response => {

                if (response.data) {
                    let data = response.data;
                    data = Object.values(data);
                    setMovieData(data);
                    setIsloading(false);
                }
                
            })
            .catch(e => alert(e.message))

    }, [uid]);

    let content = null;

    if(!isLoading && movieData) {
        content = movieData.map(result=> (
            <Card name={result.original_title ? result.original_title : result.original_name} img={result.poster_path} key={result.id} id={result.id} releaseDate={result.release_date} showNotificationHandler={props.showNotificationHandler} updateText={props.updateText} userID ={uid}/>
        ))
    } else if(movieData.length === 0 && !isLoading) {
         content = <h3 className={styles.NoData}>Watchlist empty</h3>
    } else {
        content = <Loader/>
    }

    return(
        <div className={styles.WatchlistContainer}>
           <SearchForm/>
             <div className={styles.Watchlistcards}>
                {content}
             </div>
            
        </div>
    )

}

export default withRouter(Watchlist);