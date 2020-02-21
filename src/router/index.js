import Vue from "vue";
import Router from "vue-router";
import Main from "../views/Main";
import Map2D from "../views/map/2D";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [
        {
          path: "/2D",
          name: "2D",
          component: Map2D,
        },
        {
          path: "/",
          name: "2D",
          component: Map2D,
        }
      ],

    }
  ]
});
