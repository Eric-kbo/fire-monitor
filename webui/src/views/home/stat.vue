<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="city:"
        size="sm"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-select
          size="sm"
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          size="sm"
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    <div>
      <div>
        <b-dropdown size="lg" text="Large" class="m-2">
          <b-dropdown-item-button>Action</b-dropdown-item-button>
          <b-dropdown-item-button>Another action</b-dropdown-item-button>
          <b-dropdown-item-button>Something else here</b-dropdown-item-button>
        </b-dropdown>

        <b-dropdown size="lg" split text="Large Split" class="m-2">
          <b-dropdown-item-button>Action</b-dropdown-item-button>
          <b-dropdown-item-button>Another action</b-dropdown-item-button>
          <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
        </b-dropdown>
      </div>
      <div>
        <b-dropdown size="sm" text="Small" class="m-2">
          <b-dropdown-item-button>Action</b-dropdown-item-button>
          <b-dropdown-item-button>Another action</b-dropdown-item-button>
          <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
        </b-dropdown>

        <b-dropdown size="sm" split text="Small Split" class="m-2">
          <b-dropdown-item-button>Action</b-dropdown-item-button>
          <b-dropdown-item-button>Another action</b-dropdown-item-button>
          <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stat',
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
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

<style lang="less" scoped>

</style>
