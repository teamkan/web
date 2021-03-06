import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import Axios from 'axios'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
Axios.defaults.baseURL = 'http://localhost:8080/api';

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
