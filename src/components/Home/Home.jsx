import React from 'react';
import Results from '../Results/Results';
import SearchForm from '../SearchForm/SearchForm';


import styles from './Home.module.css';

const Home = (props) => {

    let query = props.location['search'].substr(1);

    return(
      
        <div className={styles.HomeContainer}>
            <SearchForm/>
            <Results query={query} showNotificationHandler={props.showNotificationHandler} updateText={props.updateText} genre={props.genre}/>
           
        </div>
    )
}

export default Home;