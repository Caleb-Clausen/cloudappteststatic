<template>
  <div id="app">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand tag="h1" class="mb-0">{{ msg }}</b-navbar-brand>
    </b-navbar>
  
  <b-nav pills class="navbar-light bg-light">
    <!-- <b-nav-item to="menu" class="btn btn-secondary">Menu</b-nav-item> -->
    <b-nav-item to="menu">Menu</b-nav-item>
    <b-nav-item to="locations">Location</b-nav-item>
    <b-nav-item to="blends">Blends</b-nav-item>
    <b-nav-item to="art">Art</b-nav-item>
    <b-nav-item to="about">About</b-nav-item>
  </b-nav>
    <br/>
    <b-container>
      <router-view></router-view>
    </b-container>    
  </div>
</template>

<script>
const default_result = {}
export default {
  name: 'app',
  data () {
    return {
      isResultLoaded: false,
      isCloudLoaded : false,
      msg: 'Contoso Coffee',
      news : default_result ,
      word_cloud :[['tbd', 1]]
      //search_str : 'news about ....'
    }
  },
  methods: {
    doLoadResults: function (event) {
      const use_constant_results = false;
      if (use_constant_results) {
        this.news = JSON.parse(JSON.stringify(default_result));

      } else {

        this.axios.get('https://newsclouddemo.azurewebsites.net/api/NewsSearch',
          {
            params: {
              search_str: this.search_str,
            }
          }).then(response => {
          
          this.news = response.data;
        });

      }
        
      // make visible
      this.isResultLoaded = true;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
