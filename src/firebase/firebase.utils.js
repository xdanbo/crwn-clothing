import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAZc6X5AtxDe8f51zTWX3kFKIo7qa7drEQ",
  authDomain: "crwn-db-e7bd0.firebaseapp.com",
  databaseURL: "https://crwn-db-e7bd0.firebaseio.com",
  projectId: "crwn-db-e7bd0",
  storageBucket: "crwn-db-e7bd0.appspot.com",
  messagingSenderId: "93651499881",
  appId: "1:93651499881:web:5d3e17113cccd6409ddbf8",
  measurementId: "G-KKG1NRZ51Y"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
