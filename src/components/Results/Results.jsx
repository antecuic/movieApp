import React, { useState, useEffect } from 'react';

import Card from '../Card/Card';
import Loader from '../UI/Loader/Loader';
import styles from './Results.module.css';
import Axios from 'axios';

const Results = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [ movieData, setMovieData ] = useState([]);
    const { query } = props;
    let content = null;

    useEffect(() => {

        const fetchTrendingMovies = () => {
            setIsLoading(true);
            Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c861cf47355a232057cf0a02a82634f2&with_genres=${props.genre}`)
                .then(response => {
                    setMovieData(response.data.results);
                    setIsLoading(false);   
                })
                .catch(er => alert(er.message))
            
        }

        const fetchMoviesBySearch = () => {
            setIsLoading(true);
            Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c861cf47355a232057cf0a02a82634f2&${query}&adult=false`)
                .then(response => {
                    setMovieData(response.data.results);
                    setIsLoading(false);   
                })
                .catch(er => alert(er.message)) 
        }

        if (query !== '') {
            fetchMoviesBySearch();
        } else {
            fetchTrendingMovies();
        }

    }, [query, props.genre])




    if (!isLoading && movieData.length !== 0) {
        content = (
            movieData.map(result => (
                <Card name={result.original_title ? result.original_title : result.original_name} img={result.poster_path} key={result.id} id={result.id} releaseDate={result.release_date} showNotificationHandler={props.showNotificationHandler} updateText={props.updateText}/>
            ))
        )
    } else if (movieData.length === 0 && !isLoading) {
        content = <h3 className={styles.NoData}>Sorry, nothing found...</h3>
    } else {
        content = <Loader/> 
    }




    return(
        <div className={styles.Results}>
            {content}
        </div>
    )

}

export default Results;