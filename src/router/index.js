import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Meetups from '@/components/Meetup/Meetups';
import CreateMeetup from '@/components/Meetup/CreateMeetup';
import Meetup from '@/components/Meetup/Meetup';
import Profile from '@/components/User/Profile';
import Signin from '@/components/User/Signin';
import Signup from '@/components/User/Signup';
 import AuthGuard from './auth_guard';
// import VueRouter from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/meetups', name: 'Meetups', component: Meetups },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
       beforeEnter: AuthGuard,
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
       beforeEnter: AuthGuard,
    },
    { path: '/signin', name: 'Signin', component: Signin },
    { path: '/signup', name: 'Signup', component: Signup },
  ],
  mode: 'history',
});
