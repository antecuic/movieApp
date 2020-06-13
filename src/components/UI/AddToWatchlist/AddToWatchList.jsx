import React, { useContext } from 'react';

import { AuthContext } from '../../../providers/AuthProvider';
import styles from './AddToWatchlist.module.css';
import Axios from 'axios';

const AddToWatchList = (props) => {


    const user = useContext(AuthContext);
    let isAdded = props.isAdded;
   
    const addHandler = (movieId, watchlistData) => {

        if (!watchlistData.includes(movieId) || watchlistData.length === 0) {
            //get movieData
            Axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c861cf47355a232057cf0a02a82634f2`)
            .then(response => {
                let data = { ...response.data}
                Axios.put(`https://react-quizapp-bbc13.firebaseio.com/users/${user.uid}/watchlist/${movieId}.json`, data)
                    .then(() => {
                        props.showNotificationHandler();
                        props.updateText('Added to Watchlist');
                       
                    })
                    .catch(e => alert(e.message))
            })
            .catch(er => alert(er.message)) 
           
        } else {
            //remove from watchlist
            props.updateText('Already added to watchlist');

            props.showNotificationHandler();
        }  
    }

    const addToWatchlistHandler = async (movieId) => {
       
        if (user) {
            movieId = String(movieId);

            //get user's watchlist
            const watchlistResponse = await Axios.get(`https://react-quizapp-bbc13.firebaseio.com/users/${user.uid}/watchlist.json`);
            let watchlistData = await { ...watchlistResponse.data }
               
           watchlistData = Object.keys(watchlistData);

            //CHECK IF ALREADY IN DATABASE           
            addHandler(movieId, watchlistData);
            
            
        } else {
            props.updateText('Please Sign In First!');

            props.showNotificationHandler();

        }
    }

    const removeFromWatchlistHandler = async (movieId) => {
       
        if (user) {

            
            //get user's watchlist
            const watchlistResponse = await Axios.get(`https://react-quizapp-bbc13.firebaseio.com/users/${user.uid}/watchlist.json`);
            let watchlistData = await { ...watchlistResponse.data }

            delete watchlistData[movieId]

            //CHECK IF ALREADY IN DATABASE
            Axios.put(`https://react-quizapp-bbc13.firebaseio.com/users/${user.uid}/watchlist.json`, watchlistData)
                .then(() => {
                    props.updateText('Removed!');
                    props.showNotificationHandler();
                })
                .catch(e => alert(e.message))
        } 
    }

    
    
    if (isAdded) {
        return <h4 className={styles.AddToWatchlistH4} onClick={() => removeFromWatchlistHandler(props.movieId)}>Remove from Watchlist</h4>
    }
    
    if (props.type === 'h4' ) {
        return <h4 className={styles.AddToWatchlistH4} onClick={() => addToWatchlistHandler(props.movieId)}>Add To Watchlist</h4>
    } else if (props.type === 'p' ) {
        return <p className={styles.AddToWatchlistP}  onClick={() => addToWatchlistHandler(props.movieId)}>Add To Watchlist</p>
    }

}

export default AddToWatchList;