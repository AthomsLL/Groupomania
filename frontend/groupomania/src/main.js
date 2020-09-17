import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './Routes';
import Vuelidate from 'vuelidate';
import VueCookie from 'vue-cookie';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueIziToast from 'vue-izitoast';
import '../node_modules/izitoast/dist/css/iziToast.min.css';
import '../node_modules/izitoast/dist/js/iziToast';

Vue.config.productionTip = false

const moment = require('moment');
require('moment/locale/fr');

Vue.use(require('vue-moment'), {
  moment
});

Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(VueIziToast);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
