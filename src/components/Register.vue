<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="user.name"
            label="Nombre"
            prepend-icon="mdi mdi-account"
          />
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
          <v-text-field
            v-model="user.phone"
            label="Telefono"
            prepend-icon="mdi mdi-phone"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" v-on:click="register()">Register</v-btn>
        <v-btn color="info" to="/">Login</v-btn>
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
        name: "",
        email: "",
        password: "",
        phone: ""
      },
      url: "https://api-actividades.herokuapp.com/api/users/",
      showPassword: false
    };
  },
  methods: {
    register: function() {
      axios.post(this.url + "register", this.user).then(response => {
        //localStorage.setItem("id", JSON.stringify(response.data.id));
        this.$router.push("/");
      });
    }
  }
};
</script>
