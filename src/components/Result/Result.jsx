import React, { useEffect, useState, useContext } from 'react';

import Loader from '../UI/Loader/Loader';
import AddToWatchlist from '../UI/AddToWatchlist/AddToWatchList';
import { AuthContext } from '../../providers/AuthProvider';
import styles from './Result.module.css';
import Axios from 'axios';

const Result = (props) => {

    const user = useContext(AuthContext);
    let uid = null;
    if (user) {
        uid = user.uid;
    }

    const ID = props.location.pathname.substr(8)
    const [ isLoading, setIsLoading ] = useState(true);
    const [ imdbId, setIMdbId ] = useState();
    const [ watchlistMovies, setWatchlistMovies ] = useState([]);
    const [ resultData, setResultData ] = useState();

    useEffect(()=> {

        const fetchMoviebyId = () => {
            Axios.get(`https://api.themoviedb.org/3/movie/${ID}?api_key=c861cf47355a232057cf0a02a82634f2`)
                .then(response => {
                    setIMdbId(response.data.imdb_id);
                })
               
                .catch(er => alert(er.message)) 
        }

        fetchMoviebyId();
    }, [ID])

    useEffect(() => {
        
        if (imdbId) {
            Axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=6b6c5db5`)
                .then(response => {
                    setResultData(response.data)
                    setIsLoading(false)
                })
                .catch(e => alert(e.message))
        }

    }, [imdbId])

    useEffect(() => {

        Axios.get(`https://react-quizapp-bbc13.firebaseio.com/users/${uid}/watchlist.json`)
            .then(response => {

                if (response.data) {
                    let data = response.data;
                    data = Object.keys(data);
                    setWatchlistMovies(data);
                    setIsLoading(false);
                }
                
            })
            .catch(e => alert(e.message))

    }, [uid]);

    let isAdded = false;

    if (watchlistMovies.includes(ID)) {
        isAdded = true;
    }

    let content = null;

    if (!isLoading && resultData) {
        content = (
            <div className={styles.Result}>
                {/* <div className={styles.PosterContainer}>
                    <img src={resultData.Poster} alt="Poster"/>
                </div> */}  
                <div className={styles.MovieData}>
                    <div className={styles.PosterContainer}>
                        <img src={resultData.Poster} alt="Poster"/>
                    </div>
                    <div className={styles.MainMovieData}>
                        <p><span>IMDB Rating:</span> {resultData.imdbRating}</p>
                        <p><span>Genre: </span> {resultData.Genre}</p>
                        <p><span>Released: </span> {resultData.Released}</p>
                        <p><span>Actors: </span> {resultData.Actors}</p>
                    </div>

                    {/* <div className={styles.Watchlist}>
                        <AddToWatchlist type={'h3'}/>
                    </div> */}
                </div>
                <div className={styles.MovieDetails}>
                    <div className={styles.PlotContainer}>
                        <p><span>Plot: </span> {resultData.Plot}</p>
                    </div>
                        <p><span>Language: </span> {resultData.Language}</p>
                        <p><span>Runtime: </span> {resultData.Runtime}</p>
                        <p><span>Rated: </span> {resultData.Rated}</p>
                        <p><span>IMDB Votes: </span> {resultData.imdbVotes}</p>
                        <p><span>Country: </span> {resultData.Country}</p>
                        <div className={styles.AwardsContainer}>
                            <p><span>Awards: </span> {resultData.Awards}</p>
                        </div>
                </div>
                <AddToWatchlist type={'h4'} movieId = {Number(ID)} showNotificationHandler={props.showNotificationHandler} updateText={props.updateText} isAdded = {isAdded}/>
            </div>
        )
    } else {
        content = <Loader/>
    }

    return(
        <div className={styles.ResultContainer}>
            {content}
        </div>
    )

}

export default Result;