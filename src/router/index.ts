import { createRouter, createWebHistory } from "vue-router";
import {START_LIMIT, START_PAGE} from "../assets/consts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: {
        path: "/list",
      }
    },
    {
      path: "/list",
      name: "CarsList",
      component: () => import("../pages/ListCar.vue"),
    },
    {
      path: "/car:id",
      name: "Single",
      component: () => import("../pages/SingleCar.vue"),
    },
    {
      path: "/compare",
      name: "CompareCars",
      component: () => import("../pages/CompareCars.vue"),
    },
  ]
});

export default router;
