import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imgUrl:
          'https://cf.bstatic.com/images/hotel/max1280x900/506/50612942.jpg',
        id: 'a123',
        title: 'Meetup in Iceland',
        date: new Date(),
        location: 'Iceland',
      },
      {
        imgUrl:
          'https://www.state.gov/wp-content/uploads/2018/11/Norway-2560x1328.jpg',
        id: 'b456',
        title: 'Meetup in Norway',
        date: new Date(),
        location: 'Norway',
      },
      {
        imgUrl:
          'https://www.independent.ie/life/travel/ireland/62869/39817385.ece/AUTOCROP/w1240h700/HQ%20and%20Resolution%20aerial%20view%20Panorama%20of%20Cliffs%20Of%20Moher%20Ireland....The%20Cliffs%20of%20Moher%20in%20County%20Clare%20are%20Irelands%20most%20visited%20natural%20attraction.HQ%20and%20Res.%20Panorama.jpg',
        id: 'c789',
        title: 'Meetup in Ireland',
        date: new Date(),
        location: 'Ireland',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imgUrl: obj[key].imgUrl,
              date: obj[key].date,
              // creatorId:obj[key].creatorId
            });
            commit('setLoadedMeetups', meetups);
            commit('setLoading', false);
          }
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', true);
        });
    },
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        // imgUrl: payload.imgUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        // creatorId: getters.user.id
      };
      let imgUrl;
      let key;
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then((data) => {
            key = data.key;
            return key;
        })
        .then((keys) => {
          const filename = payload.img.name;
          const ext = filename.slice(filename.lastIndexOf('.') + 1);
          return firebase
            .storage()
            .ref('meetups/' + keys + '.' + ext)
            .put(payload.img);
        })
        .then((fileData) => {
          return fileData.ref.getDownloadURL().then((imgUrls) => {
           // console.log(fileData)
            return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imgUrl: imgUrls });
          });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imgUrl: imgUrl,
            id: key,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log('meetups/' + key + '.' + payload.img.name.slice(payload.img.name.lastIndexOf('.') + 1))
        });
      //reach out to firebase and store it
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.id,
            registeredMeetup: [],
          };
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.id,
            registeredMeetup: [],
          };
          console.log(newUser);
          commit('setUser', newUser);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      commit('clearError');
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.id, registeredMeetup: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  getters: {
    //computed

    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },

    //lay 5 phan tu
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      };
    },

    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});
