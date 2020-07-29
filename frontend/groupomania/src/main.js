import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Routes from './Routes';
import Vuelidate from 'vuelidate';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false

const moment = require('moment');
require('moment/locale/fr');

Vue.use(require('vue-moment'), {
  moment
});

Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(Vuelidate);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
