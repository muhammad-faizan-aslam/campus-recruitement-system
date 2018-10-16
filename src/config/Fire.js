import firebase from 'firebase' ;
var config = {
    apiKey: "AIzaSyCQ5L_tQz_4wTM_uJ_uc6zMVnO3VzBIZfM",
    authDomain: "campus-recruitment-sytem.firebaseapp.com",
    databaseURL: "https://campus-recruitment-sytem.firebaseio.com",
    projectId: "campus-recruitment-sytem",
    storageBucket: "campus-recruitment-sytem.appspot.com",
    messagingSenderId: "145496892457"
  };
  const fire = firebase.initializeApp(config);

  export default fire ;