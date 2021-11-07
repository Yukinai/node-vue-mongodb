import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// import style
import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
import './assets/scss/style.scss'
import 'amfe-flexible'
import router from './router'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)
Vue.component('m-card', Card)
import axios from 'axios'
Vue.prototype.$http=axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',

  //baseURL:'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')