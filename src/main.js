import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueWordCloud from 'vuewordcloud';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);
Vue.use(VueRouter)

Vue.component(VueWordCloud.name, VueWordCloud);

Vue.component('news-item', {
  template: '\
    <b-list-group-item class="d-flex justify-content-between align-items-center">\
      {{ title }}\
      <b-button v-on:click="$emit(\'remove\');">Remove</b-button>\
    </b-list-group-item>\
  ',
  props: ['title']
})

const locations = { template: '<div class="tab-pane active">locations tab content...</div>' }
const blends = { template:'<div class="tab-pane active">blends tab.. </div>' }
const art  = { template:'<div class="tab-pane active">art tab..</div>' }
const about  = { template:'<div class="tab-pane active">about tab..</div>' }
const menu  = { template:'<div class="tab-pane active">\
  <b-img src="./static/coffee_zoka_2.jpg" fluid-grow alt="Coffee life image"/>\
</div>'}

Vue.component('menu-order-item', menu);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/menu', name:'menu', component: menu, alias: '*' },
    { path: '/locations', name:'locations', component: locations },
    { path: '/blends', name:'blends', component: blends },
    { path: '/art', name:'art', component: art },
    { path: '/about', name:'about', component: about },
  ]
})

/*
 <b-nav-item active>Menu</b-nav-item>
    <b-nav-item>Location</b-nav-item>
    <b-nav-item>Blends</b-nav-item>
    <b-nav-item disabled>Art</b-nav-item>
    <b-nav-item >About</b-nav-item>
*/

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
