<template>
  <v-container>
    <v-layout row wrap mt-2>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 style="color:#9575cd">
              {{meetup.title}}
            </h4>
          </v-card-title>
          <v-card>
            <v-img
              :src="meetup.imgUrl"
              height="400px"
            ></v-img>
          </v-card>
          <v-card-text>
            <div class="infor-text">{{meetup.date |dateFilter}} - {{meetup.location}}</div>
            <p>
              {{meetup.description}}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark class="deep-purple lighten-1">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props:['id'],
  computed:{
    meetup(){
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>