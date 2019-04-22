<template>
    <div id="loations" class="tab-pane active">
         
        <b-container v-if="is_loading">
            locations are loading...
        </b-container>

        <b-container v-if="is_loaded">
            <ul id="locations" >
                <li v-for="l in locations" :key="l.id">
                    <b>{{l}}</b>
                </li>
            </ul>
           
        </b-container>
    </div>
</template>

<script>
const default_result = {}
export default {
  name: 'locations',
  data () {
    return {
        is_loaded : false,
        is_loading: false
    }
  },
  mounted () {
      this.is_loading = true;
      this.axios.get('https://coffeelocationsapi.azurewebsites.net/api/locations',
          {
            params: {
              search_str: this.search_str,
            }
          }).then(response => {
          this.locations = response.data;
          this.is_loaded = true;
          this.is_loading = false;
        });
    },
  methods: {
    
    doLoadResults: function (event) {
      const use_constant_results = false;
      if (use_constant_results) {
        this.news = JSON.parse(JSON.stringify(default_result));

      } else {

        this.axios.get('https://coffeelocationsapi.azurewebsites.net/api/locations',
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