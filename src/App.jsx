import React, { useState} from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './config/PrivateRoute';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Result from './components/Result/Result';
import Watchlist from './components/Watchlist/Watchlist';
import Hamburger from './components/UI/Hamburger/Hamburger';
import Notification from './components/UI/Notification/Notification';
import Sidebar from './components/Sidebar/Sidebar';
import { withRouter } from 'react-router';

const App = props => {

   const [ showSidebar, setShowSidebar ] = useState(false);
   const [ showNotification, setShowNotification ] = useState(false);
   const [ notificationText, setNotificationtext ] = useState()
   const [ genre, setGenre ] = useState(28);

    const hamburgerClickHandler = () => {
       setShowSidebar(!showSidebar);
    }

    const showNotificationHandler = () => {
        setShowNotification(!showNotification);

    }

    const genreChangedHandler = newGenre => {
        setGenre(newGenre);
        setShowSidebar(false);
        props.history.push("/");
    }

    const updateTextHandler = (text) => {
        setNotificationtext(text);
        setShowNotification(true);
    }
   
    if (showNotification) {
        setTimeout(()=> {
            setShowNotification(false)
        }, 2000)
    }

    return (
        
        <Layout>
            <Hamburger clicked={hamburgerClickHandler}/>
            <Sidebar shouldShow={showSidebar} clicked={hamburgerClickHandler} changeGenre={genreChangedHandler}/>
            <Notification show={showNotification} text = {notificationText} />
            <Route exact path="/" render={(props) => <Home { ...props } showNotificationHandler={showNotificationHandler} updateText = {updateTextHandler} genre={genre}/>}/>
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/passwordReset" component={PasswordReset}/>
            <Route exact path="/result/:id" render={(props) => <Result { ...props } showNotificationHandler={showNotificationHandler} updateText = {updateTextHandler}/>}/>
            <PrivateRoute exact path="/watchlist" component={(props) => <Watchlist { ...props } showNotificationHandler={showNotificationHandler} updateText = {updateTextHandler}/>}/>
        </Layout>
        
    )

}

export default withRouter(App);