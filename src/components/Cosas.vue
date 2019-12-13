<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Añadir Objetos</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="cosa.objeto"
            label="Objeto"
            prepend-icon="mdi mdi-clipboard-text"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="success" v-on:click="agregar()">Agregar</v-btn>
        <v-btn color="info" to="/home">Finalizar</v-btn>
        <v-btn color="red" to="/actividades">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      act_id: "",
      cosa: {
        actv_id: "",
        user_id: "",
        objeto: ""
      },
      url: "https://api-actividades.herokuapp.com/api/equipos/"
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start: function() {
      this.id = localStorage.getItem("id");
      this.act_id = localStorage.getItem("actv_id");
    },
    agregar: function() {
      this.cosa.actv_id = this.act_id;
      this.cosa.user_id = this.id;
      axios.post(this.url + "add", this.cosa).then(response => {
        alert("se ha agregado");
        this.cosa.objeto = "";
      });
    }
  }
};
</script>
