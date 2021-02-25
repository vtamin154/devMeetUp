<template>
  <v-container>
    <v-layout row v-if="error" mt-2>
      <v-flex xs 12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="ConfirmPassword"
                      label="ConfirmPassword"
                      id="ConfirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePassword]"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      dark
                      class="deep-purple lighten-1"
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                    >
                      Sign up
                      <span slot="loader" class="custom-loader">
                        <v-icon dark>mdi-cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? 'Password do not match'
        : '';
    },
    use() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    onSignUp() {
      //vuex
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      //   console.log('Dismissed Alert');
      this.$store.dispatch('clearError');
    },
  },
};
</script>
