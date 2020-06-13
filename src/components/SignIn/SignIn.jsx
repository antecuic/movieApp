import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from '../UI/Input/Input';
import styles from './SignIn.module.css';
import { auth } from '../../firebase/firebase';
import {AuthContext} from '../../providers/AuthProvider';
import { withRouter } from 'react-router';


const SignIn = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const currentUser = useContext(AuthContext);

    const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
              setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    const signIn = (event) => {
        event.preventDefault()
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                   // window.location.reload();
                    history.push("/")
                })
                .catch(error => alert(error.message))
    }

    if(currentUser) {
        return <Redirect to="/"/>
    } 
    return(
        <React.Fragment>
            <div className={styles.signInWrapper}>
                <div className={styles.signInContainer}>
                    <h1 className={styles.SignInText}>SignIn</h1>
                    <form onSubmit={(event) => signIn(event)}>    
                        <Input type={'email'} name={'userEmail'} placeholder={'Email here'} onChange={(event) => onChangeHandler(event)}/>
                        <Input type={'password'} name={'userPassword'} placeholder={'Password here'} onChange={(event) => onChangeHandler(event)}/>
                        <button type="submit">SignIn</button>
                        <Link to="/signUp" style={{textDecoration: 'none'}}>
                            <p>Don't have an account? <span>SignUp</span></p>
                        </Link>
                        <Link to="/passwordReset" style={{textDecoration: 'none'}}>
                            <p>Forgot password? <span>Reset</span></p>
                        </Link>
                    </form>
                </div>
            </div>
        </React.Fragment>
       

    )
} 

export default withRouter(SignIn);