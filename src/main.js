import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueWordCloud from 'vuewordcloud';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);

Vue.component(VueWordCloud.name, VueWordCloud);

Vue.component('news-item', {
  template: '\
    <b-list-group-item class="d-flex justify-content-between align-items-center">\
      {{ title }}\
      <button v-on:click="$emit(\'remove\');">Remove</button>\
    </b-list-group-item>\
  ',
  props: ['title']
})

new Vue({
  el: '#app',
  render: h => h(App)
})
