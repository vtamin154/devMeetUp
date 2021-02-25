<template>
  <v-container>
    <v-layout class="mt-2">
      <v-row wrap>
        <v-col cols="12" sm="6" 
        class=" text-center text-sm-right">
          <v-btn
            dark
            large
            to="/meetup"
            class="deep-purple lighten-3 mr-2"
            >Explore Meetups</v-btn
          >
        </v-col>

        <v-col cols="12" sm="6" class="text-center text-sm-left ">
          <v-btn
            dark
            large
            to="/meetup/new"
            class="deep-purple lighten-3 ml-2"
            >Organize Meetup</v-btn
          >
        </v-col>
      </v-row>
    </v-layout>

    <v-layout row mt-2>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          indeterminate
          color="#9d80d1"
          :width="4"
          :size="40"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-row v-if="!loading">
      <v-col cols="12" >
        <v-carousel
          cycle
          height="420"
          hide-delimiter-background
          show-arrows-on-hover
          style="cursor: pointer"
        >
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imgUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-layout row wrap>
      <v-flex class=" text-center">
        <p style="font-weight: 500">Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id);
    },
  },
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 32px;
  /* background-color: rgba(0, 0, 0, 0.25); */
  color: white;
  padding-left: 20px;
}
</style>
