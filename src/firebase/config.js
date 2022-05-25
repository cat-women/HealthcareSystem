import  firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBMjZBOsy0yrPuPvVVaPBUYybotiAyRmNA",
    authDomain: "healthcare-system-381df.firebaseapp.com",
    projectId: "healthcare-system-381df",
    storageBucket: "healthcare-system-381df.appspot.com",
    messagingSenderId: "467785729614",
    appId: "1:467785729614:web:67ac08205859847f7e251f",
    measurementId: "G-WCP9YVHWZ3"
};
//initialize firebase 

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };