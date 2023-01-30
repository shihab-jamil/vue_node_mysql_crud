<template>
  <v-row class="h-screen bg-cyan-accent-3 d-flex justify-center align-center pa-0 ma-0">
    <v-col lg="3" md="5" sm="8" >
      <v-card title="Login" class="pa-3">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.password"
                label="Password"
                required
              ></v-text-field>
              <v-btn
                class="float-right"
                variant="flat"
                color="secondary"
                @click="login"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import config from "../data/config.js";

export default {
  name: "Login",
  data(){
    return {
      formData : {
        email : "",
        password : ""
      }
    }
  },
  methods : {
    async login(){
      let response = await axios.post(`${config.api_domain}/login`, this.formData)
      console.log(response)
    }
  }
}
</script>

<style scoped>

</style>
