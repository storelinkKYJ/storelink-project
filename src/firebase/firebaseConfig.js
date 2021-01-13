// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html


import firebase from 'firebase/app'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBNq2oEBBtmQiGf1mvVPeTtsZp6CM9Lgcc",
    authDomain: "storelink-project-kyj.firebaseapp.com",
    databaseURL: "https://storelink-project-kyj-default-rtdb.firebaseio.com",
    projectId: "storelink-project-kyj",
    storageBucket: "storelink-project-kyj.appspot.com",
    messagingSenderId: "181015606821",
    appId: "1:181015606821:web:e04a3fc344b54bd98571cc",
    measurementId: "G-GBG14700M2"
}

firebase.initializeApp(config)
