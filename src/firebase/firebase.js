import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAs-IG4R_2xCmyrhS3ghaLvYa-wpszx_38",
    authDomain: "react-quizapp-bbc13.firebaseapp.com",
    databaseURL: "https://react-quizapp-bbc13.firebaseio.com",
    projectId: "react-quizapp-bbc13",
    storageBucket: "react-quizapp-bbc13.appspot.com",
    messagingSenderId: "1038149397416",
    appId: "1:1038149397416:web:5184a1a419a332cfb20b9d",
    measurementId: "G-Q2V9EC39E2"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const signOut = () => {
    auth.signOut();
    window.location.reload()
}
