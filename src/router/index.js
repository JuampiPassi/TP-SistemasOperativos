import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'
import Procesos from '../views/Procesos.vue'
import Gantt from '../views/Gantt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Procesos/:id',
    name: 'Procesos',
    component: Procesos
  },
  {
    path: '/Gantt/:id',
    name: 'Gantt',
    component: Gantt
  },
]

const router = new VueRouter({
  routes
})

export default router
