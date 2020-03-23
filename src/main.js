import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios
Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
