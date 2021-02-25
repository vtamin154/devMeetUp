import * as firebase from 'firebase'

const config ={
    apiKey:'AIzaSyCXaOPmLZ2CdcwnmDhNZBDgXUC6nWhMbDw',
      authDomain: 'devmeetup-74d07.firebaseapp.com',
      databaseURL: 'https://devmeetup-74d07.firebaseio.com',
      projectId: 'devmeetup-74d07',
      storageBucket: ''
}
firebase.initializeApp(config);


const auth = firebase.auth();

export {
  auth
};