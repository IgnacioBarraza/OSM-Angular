// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLBjQm5v6ldceA8O2JD41ImDnAQ9RsIK4",
    authDomain: "osm-angular-v15.firebaseapp.com",
    projectId: "osm-angular-v15",
    storageBucket: "osm-angular-v15.appspot.com",
    messagingSenderId: "525967135196",
    appId: "1:525967135196:web:332af1c71d842243203f19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
}