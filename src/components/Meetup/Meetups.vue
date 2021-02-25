<template>
  <v-container>
    <v-layout row wrap mt-2 v-for="meetup in meetups" :key="meetup.id">
      <v-flex class="xs12 sm10 md8 offset-sm1 offset-md2">
        <v-card class="infor mb-5">
          <v-container fluid class="deep-purple lighten-3">
            <v-layout>
              <v-flex class="xs5 sm4 md6">
                <v-card>
                  <v-img
                    :src="meetup.imgUrl"
                  ></v-img>
                </v-card>
              </v-flex>
              <v-flex class="xs7 sm8 md9">
                <v-card-title>
                  <div>
                    <h5 class="white--text mb-0">{{meetup.title}}</h5>
                    <div>{{meetup.date | dateFilter}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn 
                  :to="'/meetups/' + meetup.id"
                  style="margin-left:10px">
                    <v-icon left>mdi-arrow-right</v-icon>
                    View meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
   computed:{
    meetups(){
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>