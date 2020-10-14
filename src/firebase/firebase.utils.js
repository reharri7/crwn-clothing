import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBDQhFC3ffCkvTmT6oOZLc1OLat_UchqFY",
    authDomain: "e-commerce-template-6e9e9.firebaseapp.com",
    databaseURL: "https://e-commerce-template-6e9e9.firebaseio.com",
    projectId: "e-commerce-template-6e9e9",
    storageBucket: "e-commerce-template-6e9e9.appspot.com",
    messagingSenderId: "1003814660127",
    appId: "1:1003814660127:web:ce08b2a8ed285b4863cd2a",
    measurementId: "G-CTHP8VXL52"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } 
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;