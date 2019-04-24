<template>
    <div id="about" class="tab-pane active">
         
        <b-container v-if="is_loading">
            About demo info is loading...
        </b-container>

        <b-container v-if="is_loaded">
            loaded
             {{about}}
        </b-container>

        <b-container v-if="has_error">
            Demo HTTP return code: {{error_code}}
            <br/>
            {{error_message}}
        </b-container>
    </div>
</template>

<script>
const default_result = {}
export default {
  name: 'about',
  data () {
    return {
        is_loaded : false,
        is_loading: false,
        has_error : false,
    }
  },
  mounted () {
      this.is_loading = true;
      this.axios.get( 'https://contosodemoexception.azurewebsites.net/api/HttpTriggerException',
          // 'https://coffeelocationsapi.azurewebsites.net/api/locations' - the good api
          {
            params: {
            }
          }
        ).then(response => {
          this.about = response.data;
          this.is_loaded = true;
          this.is_loading = false;
        })
        .catch(error => {
            this.error_code = error.response.status;
            this.error_message = error.message;
            this.has_error = true;
            //console.error('error request:', error);
        });
    }
  }

</script>