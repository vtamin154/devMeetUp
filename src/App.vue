<template>
  <v-app>
    <v-toolbar max-height="64" dark class="deep-purple lighten-2">
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="sideNav = !sideNav"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          DevMeetUp
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          depressed
          class="deep-purple lighten-2"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>
            {{ item.icon }}
          </v-icon>
          {{ item.title }}</v-btn
        >
        <v-btn
          depressed
          class="deep-purple lighten-2"
           v-if="userIsAuthenticated"
           @click="onLogOut"
        >
          <v-icon left>
            mdi-account-arrow-right-outline
          </v-icon>
            Logout
          </v-btn
        >
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer absolute temporary v-model="sideNav" dark>
      <v-list>
        <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
        left
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item.title}}
          </v-list-item-content>
        </v-list-item>
        <v-list-item 
          v-if="userIsAuthenticated"
          @click="onLogOut"
        >
          <v-list-item-action>
            <v-icon>
              mdi-account-arrow-right-outline
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Logout
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed:{
    menuItems(){
      let menuItems = [
        { icon: 'mdi-face', title: 'Sign up', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
      ]
      if(this.userIsAuthenticated){
        menuItems = [
          { icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups' },
        {
          icon: 'mdi-map-marker',
          title: 'Organize Meetup',
          link: '/meetup/new',
        },
        { icon: 'mdi-account', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
  },
  methods:{
    onLogOut(){
      this.$store.dispatch('logout')
    }
  }
};
</script>
<style scoped></style>
