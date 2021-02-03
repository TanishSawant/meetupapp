import firebase from 'firebase/app';
import 'firebase/auth';



const app = firebase.initializeApp({
    apiKey: "AIzaSyDZiQxLHFbamQ7VRSW67fmzXoV7xUqhsac",
    authDomain: "meetup-8405b.firebaseapp.com",
    projectId: "meetup-8405b",
    storageBucket: "meetup-8405b.appspot.com",
    messagingSenderId: "435894963109",
    appId: "1:435894963109:web:5516acf58b6334011ef64c"
})

export default app;
export const auth = app.auth();

// // const firebaseConfig = {
//     apiKey: "AIzaSyDZiQxLHFbamQ7VRSW67fmzXoV7xUqhsac",
//     authDomain: "meetup-8405b.firebaseapp.com",
//     projectId: "meetup-8405b",
//     storageBucket: "meetup-8405b.appspot.com",
//     messagingSenderId: "435894963109",
//     appId: "1:435894963109:web:5516acf58b6334011ef64c"
// //   };