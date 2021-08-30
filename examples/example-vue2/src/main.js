import Vue from 'vue'
import App from './App.vue'
import DeviceDetector from 'rtc-device-detector-vue2';
import 'rtc-device-detector-vue2/dist/index.css';

Vue.config.productionTip = false

Vue.use(DeviceDetector);

new Vue({
  render: h => h(App),
}).$mount('#app')
