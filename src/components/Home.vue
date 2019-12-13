<template>
  <v-card>
    <v-toolbar color="teal" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Lista de Actividades</v-toolbar-title>

      <v-spacer></v-spacer>
      <div>
        <v-btn
          slot="activator"
          color="primary"
          dark
          class="mb-2"
          to="/actividades"
          >Nueva Actvidad</v-btn
        >
      </div>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="item in all_actividades"
        :key="item.actividad"
        v-model="item.active"
        prepend-icon="mdi mdi-clipboard-outline"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.actividad"></v-list-item-title>
            <v-list-item-subtitle v-text="item.fecha"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.hora"></v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.tempArray" :key="subItem.objeto">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.objeto"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      all_actividades: [],
      all_objetos: [],
      id: "",
      url_act: "https://api-actividades.herokuapp.com/api/activities/",
      url_obj: "https://api-actividades.herokuapp.com/api/equipos/"
    };
  },
  mounted() {
    this.start();
    this.GetEquipos();
    this.GetActividades();
  },
  methods: {
    start: function() {
      this.id = localStorage.getItem("id");
    },
    GetEquipos: function() {
      axios.get(this.url_obj + "getAllEquipos").then(response => {
        for (var i = 0; i < response.data.equipos.length; i++) {
          if (this.id == response.data.equipos[i].user_id) {
            this.all_objetos.push(response.data.equipos[i]);
          }
        }
      });
    },
    GetActividades: function() {
      axios.get(this.url_act + "getAllActivities").then(result => {
        for (var i = 0; i < result.data.activity.length; i++) {
          var dates = this.formatDate(result.data.activity[i].fecha);
          var act = {
            id: result.data.activity[i].id,
            user_id: result.data.activity[i].user_id,
            actividad: result.data.activity[i].actividad,
            fecha: dates,
            hora: result.data.activity[i].hora,
            tempArray: []
          };
          this.all_actividades.push(act);
          for (var j = 0; j < this.all_objetos.length; j++) {
            if (this.all_actividades[i].id == this.all_objetos[j].actv_id) {
              var equip = {
                objeto: this.all_objetos[j].objeto
              };
              this.all_actividades[i].tempArray.push(equip);
            }
          }
        }
      });
    },
    formatDate: function(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      var dia = parseInt(day) + 1;
      day = "" + dia;
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }
  }
};
</script>
