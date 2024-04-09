import { createRouter, createWebHistory } from 'vue-router'
import AccueilRobot from "../components/AccueilRobot.vue";
import HomeView from "@/views/HomeView.vue";
import Page404 from "@/views/Page404.vue";
import ProgrammationRobotView from "../views/ProgrammationRobotView.vue";
import Simulation from "../components/Simulation.vue";
import InscriptionView from "@/views/InscriptionView.vue";
import LoginView from "@/views/LoginView.vue";
import RobotMoteur from "../views/RobotMoteur.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/diagrams',
      name: 'diagrams',
      component: () => import('../views/Diagrams.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/accueilRobot',
      name: 'accueilRobot',
      component: AccueilRobot
    },

    {
      path: '/programmationRobot',
      name: 'programmationRobot',
      component: ProgrammationRobotView
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: LoginView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: InscriptionView
    },

    {
      path: '/simulation',
      name: 'simulation',
      component: Simulation
    },
    {
      path: '/robotMoteur',
      name: 'robotMoteur',
      component: RobotMoteur
    },

    {
      path: '/:pathMatch(.*)',
      name: 'page404',
      component: Page404
    }
  ]
})

export default router
