import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import styles from './PasswordReset.module.css';
import Input from '../UI/Input/Input';
import { AuthContext } from '../../providers/AuthProvider';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [note, setNote] = useState(false);
    const currentUser = useContext(AuthContext);


    const submitHandler = () => {

        auth.sendPasswordResetEmail(email)
            .then(() => {
                setNote(true)
                setTimeout(() => {
                    setRedirect(true);
                }, 2000)
            })
            .catch(error => {
                alert(error.message)
        });
    }
    
    if (currentUser) {
        return <Redirect to="/"/>
    }

    return (
        <div className={styles.ForgotPassWrapper}>
            {redirect ? <Redirect to="/signIn"/> : null}
                <div className={styles.ForgotPassContainer}>
                    <p>Reset your password</p>
                    <Input type={'email'} name={'passResetEmail'} placeholder={'Enter email'} onChange={(event) => setEmail(event.target.value)}/>
                    <button onClick={submitHandler}>Submit</button>
                    {note && <p className={styles.Note}>Check your email!</p>}
            </div>
        </div>
    )
}

export default PasswordReset;
