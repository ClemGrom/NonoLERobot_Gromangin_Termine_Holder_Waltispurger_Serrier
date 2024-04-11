import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import Page404 from "@/views/Page404.vue";
import ProgrammationRobotView from "../views/ProgrammationRobotView.vue";
import InscriptionView from "@/views/InscriptionView.vue";
import LoginView from "@/views/LoginView.vue";
import RobotMoteur from "../views/RobotMoteur.vue";
import PreviousLevels from "@/views/PreviousLevels.vue";
import Tutoriel from "@/views/Tutoriel.vue";
import presentationView from "@/views/presentationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/tutoriel",
      name: "tutoriel",
      component: Tutoriel,
    },
    {
      path: "/presentation",
      name: "presentation",
      component: presentationView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },

    {
      path: "/programmationRobot",
      name: "programmationRobot",
      component: ProgrammationRobotView,
    },
    {
      path: "/connexion",
      name: "connexion",
      component: LoginView,
    },
    {
      path: "/inscription",
      name: "inscription",
      component: InscriptionView,
    },
    {
      path: "/robotMoteur",
      name: "robotMoteur",
      component: RobotMoteur,
    },
    {
      path: "/previous-levels",
      name: "previous-levels",
      component: PreviousLevels,
    },

    {
      path: "/:pathMatch(.*)",
      name: "page404",
      component: Page404,
    },
  ],
});

export default router;
