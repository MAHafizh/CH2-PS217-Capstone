const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyABGzQjL-isf6MjmqlJgbnp5NTQeCP8Wlk",
  authDomain: "testing-project-92c7c.firebaseapp.com",
  projectId: "testing-project-92c7c",
  storageBucket: "testing-project-92c7c.appspot.com",
  messagingSenderId: "1051746204514",
  appId: "1:1051746204514:web:a5f9cf8f3a79b3c9bc4a3b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const userRefs = db.collection("useraccount");

module.exports = userRefs;