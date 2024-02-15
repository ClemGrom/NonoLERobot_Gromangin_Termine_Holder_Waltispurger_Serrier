import { createRouter, createWebHistory } from 'vue-router'
import AccueilRobot from "@/components/accueilRobot.vue";
import HomeView from "@/views/HomeView.vue";


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
  ]
})

export default router
