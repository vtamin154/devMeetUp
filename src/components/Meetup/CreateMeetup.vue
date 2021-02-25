<template>
  <v-container mt-2>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h2 style="color:#7e57c2">Create a new Meetup</h2>
      </v-flex>
    </v-layout>

    <v-layout mt-6>
      <v-flex>
        <form @submit.prevent="onCreateMeetup">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="Location"
                v-model="location"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="" 
              @click="onPickFile"
               >
                Upload Image
              </v-btn>
              <input type="file" 
              ref="fileInput"
             style="display:none"
              @change="onPickFiled"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imgUrl" height="150"/>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
                multi-line
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date and Time</h4>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date" color="deep-purple lighten-1">
              </v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker
                v-model="time"
                color="deep-purple lighten-1"
                format="24hr"
              >
              </v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                :disabled="!formIsValid"
                type="submit"
                class="deep-purple lighten-1"
                dark
                >Create Meetup</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imgUrl: '',
      description: '',
      // date:new Date(),
      date: '',
      time: new Date(),
      img:null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imgUrl !== '' &&
        this.description !== ''
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if(!this.img){
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        // imgUrl: this.imgUrl,
        img:this.img,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    },
    onPickFile(){
      this.$refs.fileInput.click();
    },
    onPickFiled(event){
      const files = event.target.files;
      let filename = files[0].name;
      if(filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () =>{
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.img = files[0]
    }
  },
};
</script>
