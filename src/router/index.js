import { createRouter,createMemoryHistory } from 'vue-router';

import login from '../components/login.vue';
import signup from '../components/signup.vue';
import index from '../components/index.vue';
import index2 from '../components/index2.vue';
import forgotpass from '../components/forgotpass.vue';

const routes = [
  { path:'/', component: login},
  { path:'/signup', component: signup},
  { path:'/student', component: index},
  { path:'/admin', component: index2},
  { path:'/forgotpass', component: forgotpass},

];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;