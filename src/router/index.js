import { createRouter, createWebHistory } from "vue-router";
import Tasks from "../views/Tasks.vue";
import New from "../views/New.vue";
import Task from "../views/Task.vue";

const routes = [
  {
    path: "/",
    component: Tasks
  },
  {
    path: "/new",
    component: New
  },
  {
    path: "/task/:taskid",
    component: Task,
    props: true
    // children: [
    //   {path: ':taskid', component: Task, props: true}
    // ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});

export default router;
