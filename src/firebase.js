//firebase
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


//firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAOscQx5WJLI_R6ia5OUzRZamlUn7dWOCk',
  authDomain: 'ejada-smslistener-f4c10.firebaseapp.com',
  projectId: 'ejada-smslistener-f4c10',
  storageBucket: 'ejada-smslistener-f4c10.appspot.com',
  messagingSenderId: '537979510954',
  appId: '1:537979510954:web:094fe19497e6540062f0d3',
  measurementId: 'G-ZSJQJS9CP8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
