import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: {
        path: "/list",
        query: {
          limit: 20,
          skip: 0,
        }
      }
    },
    {
      path: "/list",
      name: "CarsList",
      component: () => import("../pages/list.vue"),
    },
    {
      path: "/car:id",
      name: "Single",
      component: () => import("../pages/single.vue"),
    }
  ]
});

export default router;
