//MODULE DUS GEEN IIFE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, get, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACz9XwjRWc6k9Mep--iNbDLyxkJqR_zIA",
  authDomain: "routio-33bc2.firebaseapp.com",
  projectId: "routio-33bc2",
  storageBucket: "routio-33bc2.appspot.com",
  messagingSenderId: "20222628765",
  appId: "1:20222628765:web:c45b5667e358d8b5e51574",
  measurementId: "G-VC28HW3SK0",
  databaseURL: "https://routio-33bc2-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const dbRef = ref(database);
const logout = document.querySelector("#logoutBtn")

logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "../../"
      }).catch((error) => {
        console.error(error)
      });
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid
    const header = document.querySelector("#header-welcome-message")

    const usersRef = ref(database, `users/`)
    header.innerHTML = `Hi ${user.displayName}, welcome back!`

    //VOEG EEN GEBRUIKER TOE INDIEN DEZE NOG NIET BESTAAT
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if(data){
        const uidArray = Object.keys(data)
        let counter = 0

        uidArray.forEach(user => {
          if(user === uid){
            counter++
          }
        })

        if(counter != 1){
          console.log("hi")
          writeUserData(uid, user.displayName, user.email, user.photoURL)
        }
      }
      else{
        writeUserData(uid, user.displayName, user.email, user.photoURL)
        console.log("no data to work with")
      }
    })
  } else {
    window.location = "../login/"
  }
});

function writeUserData(userId, name, email, photo) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    photoURL: photo
  });
}