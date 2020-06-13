import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

import Backdrop from '../UI/Backdrop/Backdrop';
import styles from './Sidebar.module.css';
import Link from '../Link/Link';
import Axios from 'axios';
import { signOut } from '../../firebase/firebase';

const Sidebar = (props) => {

    const [genres, setGenres] = useState();

    const currentUser = useContext(AuthContext);

    let classes = [styles.Sidebar]
    let links = [];


    useEffect(() => {

        Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=c861cf47355a232057cf0a02a82634f2`)
                .then(response => {
                    setGenres(response.data['genres'])
                })
                .catch(er => alert(er.message))

    }, [])

    const findGenreId = value => {

        let id = null;

        genres.forEach(el => {
            if(el['name'] === value) {
                id = el['id'];
            }
        })
        props.changeGenre(id);
    }


    if (currentUser) {
        links = [
            {
                path: "/", link: "Home"
            },
            {
                path: "/watchlist", link:"Watchlist"
            },
        ]
    } else {
        links = [
            {
                path: "/", link: "Home"
            }, 
            {
                path: "/signIn", link: "SignIn"
            },
            {
                path: "/signUp", link: "SignUp"
            }
        ]
    }

    if (props.shouldShow && props.clicked) {
        classes.push(styles.ShowSidebar)
    }

    return(
        <React.Fragment>
        <Backdrop
            show={props.shouldShow}
            clicked = {props.clicked}
        />
            <div className={classes.join(' ')}>
               {links.map(el => {
                   return <div onClick={props.clicked} key={el.link} className={styles.SidebarLinks}><Link path={el.path} link={el.link}/></div>
               })}
               <div className={styles.Selection}>
                    <select onChange={(e) => findGenreId(e.target.value)}>
                      {genres && genres.map(el => {
                          return <option key={el['id']} id={el['id']}>{el['name']}</option>
                      })}
                    </select>
               </div>
               {currentUser && <p onClick={signOut} className={styles.SidebarLinks}>Logout</p>}
            </div>
        </React.Fragment>
    )

};  

export default Sidebar;