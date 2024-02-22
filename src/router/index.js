import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Characters from '../views/Characters.vue';
import CharacterDetails from '../views/CharacterDetails.vue';
import Comics from '../views/Comics.vue';
import ComicsDetails from '../views/ComicsDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: Characters
  },
  {
    path: '/Character/:id',
    name: 'CharacterDetails',
    component: CharacterDetails
  },
  {
    path: '/comics',
    name: 'Comics',
    component: Comics
  },
  {
    path: '/comics/:id',
    name: 'ComicsDetails',
    component: ComicsDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
