import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCDFOskGihRPO0uEjo1pt0yyXEqfYY_8ag",
    authDomain: "marvel-quiz-dd9eb.firebaseapp.com",
    projectId: "marvel-quiz-dd9eb",
    storageBucket: "marvel-quiz-dd9eb.appspot.com",
    messagingSenderId: "645365287987",
    appId: "1:645365287987:web:cdbe826c80108e9a6e2746"
  };

class Firebase {

    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    signoutUser = () => this.auth.signOut()

    passwordReset = (email) => this.auth.sendPasswordResetEmail(email)

    user = (uid) => this.db.doc(`users/${uid}`)

}

export default Firebase