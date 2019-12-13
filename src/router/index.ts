import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Actividades from "@/components/Actividades.vue";
import Cosas from "@/components/Cosas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/actividades",
    name: "actividades",
    component: Actividades
  },
  {
    path: "/cosas",
    name: "cosas",
    component: Cosas
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
