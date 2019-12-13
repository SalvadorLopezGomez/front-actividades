<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Actividad</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="act.actividad"
            label="Agregar Actividad"
            prepend-icon="mdi mdi-clipboard-outline"
          />
          <v-text-field
            type="date"
            v-model="act.fecha"
            label="Fecha"
            prepend-icon="mdi mdi-calendar"
          />
          <v-text-field
            v-model="act.hora"
            label="Hora"
            prepend-icon="mdi mdi-clock"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        <v-btn color="info" v-on:click="agregar()">Agregar</v-btn>
        <v-btn color="red" to="/home">Cancelar</v-btn>
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
      act: {
        user_id: null,
        actividad: "",
        fecha: "",
        hora: ""
      },
      url: "https://api-actividades.herokuapp.com/api/activities/"
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start: function() {
      this.id = localStorage.getItem("id");
    },
    agregar: function() {
      this.act.user_id = this.id;
      axios
        .post(this.url + "add", this.act)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("actv_id", JSON.stringify(response.data.id));
          this.$router.push("/cosas");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
