import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase';
import Input from '../UI/Input/Input';
import styles from './signUp.module.css';
import Axios from 'axios';
import { withRouter, Redirect } from 'react-router';
import {AuthContext} from '../../providers/AuthProvider';


const SignUp = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const currentUser = useContext(AuthContext);

    const onChangeHandler = event => {

        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };

    const signUpHandler = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then(result => {
    
            const user = {
                username: displayName,
                email: email,
                password: password,
                uid: result.user.uid,
            }
    
            Axios.put(`https://react-quizapp-bbc13.firebaseio.com/users/${result.user.uid}.json`, user)
        })
        .then(() => {
            setEmail("")
            setPassword("")
            setDisplayName("")
            history.push("/")
        })
        .catch(error => alert(error.message));
    }

    if(currentUser) {
        return <Redirect to="/"/>
    }

    return(
        <React.Fragment>
            <div className={styles.signUpWrapper}>
                <div className={styles.signUpContainer}>
                    <h1 className={styles.SignUpText}>SignUp</h1>
                    <form>   
                        <Input type={"email"} name={"userEmail"} placeholder={"Email here"} onChange={event => onChangeHandler(event)}/> 
                        <Input type={"text"} name={"displayName"} placeholder={"Username here"}  onChange={event => onChangeHandler(event)}/> 
                        <Input type={"password"} name={"userPassword"} placeholder={"Password here"}  onChange={event => onChangeHandler(event)}/> 
                        <button onClick={event => {signUpHandler(event)}}>SignUp</button>
                        <Link to="/signIn" style={{textDecoration: 'none'}}>
                            <p>Already have an account? <span>SignIn</span></p>
                        </Link>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(SignUp);