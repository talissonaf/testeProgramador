import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueTheMask from 'vue-the-mask';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueTheMask);

new Vue({
  el: '#app',
  render: h => h(App)
})
