<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.email"
            label="Correo"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="user.password"
            label="Contraseña"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/register">Register</v-btn>
        <v-btn color="info" v-on:click="login()">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      url: "https://api-actividades.herokuapp.com/api/users/",
      showPassword: false
    };
  },
  methods: {
    login: function() {
      axios.post(this.url + "login", this.user).then(response => {
        console.log(response.data.users.id);
        localStorage.setItem("id", JSON.stringify(response.data.users.id));
        this.$router.push("/home");
      });
    }
  }
};
</script>
