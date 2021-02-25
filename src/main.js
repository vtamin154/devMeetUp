import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router/index'
import {store} from './store'
import DateFilter from './filters/date'
import firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
// import {auth} from './firebase/firebase'
Vue.component('app-alert', AlertCmp)
Vue.config.productionTip = false
Vue.filter('dateFilter', DateFilter)

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXaOPmLZ2CdcwnmDhNZBDgXUC6nWhMbDw",
  authDomain: "devmeetup-74d07.firebaseapp.com",
  projectId: "devmeetup-74d07",
  storageBucket: "gs://devmeetup-74d07.appspot.com",
  messagingSenderId: "577667883942",
  appId: "1:577667883942:web:dca32ff4bc047177672567",
  measurementId: "G-F9YF284B6W"
};
firebase.initializeApp(firebaseConfig);
// firebase.auth().onAuthStateChanged(user =>{
//   if(user){
//     this.$store.dispatch('autoSignIn', user)
//   }
// })
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  // created(){
  //   firebase.initalizeApp({
  //     apiKey: "AIzaSyCXaOPmLZ2CdcwnmDhNZBDgXUC6nWhMbDw",
  //     authDomain: "devmeetup-74d07.firebaseapp.com",
  //     projectId: "devmeetup-74d07",
  //     storageBucket: "devmeetup-74d07.appspot.com",
  //     messagingSenderId: "577667883942",
  //     appId: "1:577667883942:web:dca32ff4bc047177672567",
  //     measurementId: "G-F9YF284B6W"
  //   })
  //this.$store.dispatch('loadMeetups')
  // }
}).$mount('#app')
