import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
