import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBucXHuCkGjWLYcP1HPL1tEW5RegwDp97Y",
    authDomain: "crwn-clothing-db-9b2ab.firebaseapp.com",
    projectId: "crwn-clothing-db-9b2ab",
    storageBucket: "crwn-clothing-db-9b2ab.appspot.com",
    messagingSenderId: "20956294615",
    appId: "1:20956294615:web:976652c725b39603cdef92"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt

            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }

    };

    return userDocRef;
}