import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
//import router from './router/index.js';

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    //router,
    components: {App},
    template: '<App />',
    render: h => h(App)
})/*.$mount('#app')*/