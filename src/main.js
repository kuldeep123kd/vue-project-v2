import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import locale from "element-ui/lib/locale/lang/en";
import vmodal from 'vue-js-modal'
import VeeValidate from 'vee-validate';
import router from "./router";

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });
Vue.use(VueAxios, axios);
Vue.use(vmodal);
Vue.use(VeeValidate);

new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>",
});