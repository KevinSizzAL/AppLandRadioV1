import firebase from 'firebase';
require('firebase/firestore');

//Brayan: Credenciales de acceso a la base de datos de firebase
var config = {
	apiKey: "AIzaSyB2VE2BHur9Kn0fKARQYci__QXdeEycZVA",
	authDomain: "radio-hit.firebaseapp.com",
	databaseURL: "https://radio-hit.firebaseio.com",
	projectId: "radio-hit",
	storageBucket: "radio-hit.appspot.com",
	messagingSenderId: "113683115012"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const setting = {timestampsInSnapshots: true}
db.settings(setting)
const firebaseAuth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export  {db, firebaseAuth, provider}