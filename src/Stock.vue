<template>
    <div id="stock" class="tab-pane active">
        <b-card class="mt-3" header="Restock request">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="text-left">
            <b-form-group id="input-group-1" label="Coffee blend:" label-for="input-1">
                <b-form-select
                id="input-1"
                v-model="form.food"
                :options="coffee_blends"
                required
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Phone :" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter phone number"
                ></b-form-input>
            </b-form-group>


            <b-form-group
                id="input-group-3"
                label="Email address:"
                label-for="input-3"
                description="Contact information for stock approval request."
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="primary">Reset</b-button>
            </b-form>
        </b-card>

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
  name: 'stock',
  data () {
    return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        coffee_blends: [{ text: 'Select one', value: null }, 'Seattle blend', 'Decaf Seattle blend', 'Pacific Northwest light blend'],
        show: true,
        is_loading: false,
        is_loaded : false,
        has_error: false
    }
  },
  mounted () {
      this.is_loading = false;
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }

</script>