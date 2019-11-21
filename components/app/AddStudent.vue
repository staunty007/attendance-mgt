<template>
  <div class="col-md-8 col-sm-12 col-xs-12" v-if="displayAdd">
    <div class="card bg-light">
      <h5 class="card-header text-center font-weight-bold bg-blue text-white">ADD NEW STUDENT</h5>
      <div class="card-body">
        <form>
          <div class="form-group row">
            <label for="" class="col-sm-2 col-form-label font-weight-bold">Full Name</label>
            <div class="col-sm-5">
              <input type="text" v-model.trim="form.name" class="form-control">
            </div>
            <p class="text-danger" v-if="!$v.form.name.required">field is required</p>
            <p class="text-danger" v-if="!$v.form.name.minLength">Name must have at least
              {{$v.form.name.$params.minLength.min}} letters.</p>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label font-weight-bold">Matric No</label>
            <div class="col-sm-5">
              <input type="number" v-model.number.trim="form.matric" class="form-control">
            </div>
            <p class="text-danger" v-if="!$v.form.matric.required">field is required</p>
            <p class="text-danger" v-if="!$v.form.matric.minLength">Name must have at least
              {{$v.form.matric.$params.minLength.min}} letters.</p>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label font-weight-bold">Phone No</label>
            <div class="col-sm-5">
              <input type="tel" v-model.number.trim="form.phone" class="form-control">
            </div>
            <p class="text-danger" v-if="!$v.form.phone.required">field is required</p>
          </div>
          <div class="form-group row">
            <label for="inputPassword" class="col-sm-2 col-form-label font-weight-bold">Gender</label>
            <div class="col-sm-10 mt-2">
              <div class="form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" v-model.trim="form.gender" value="male">MALE
                </label>
              </div>
              <div class="form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" v-model.trim="form.gender" value="female">FEMALE
                </label>
              </div>
              <div class="form-check-inline">
                <p class="text-danger" v-if="!$v.form.gender.required">field is required</p>
              </div>
            </div>
          </div>
        </form>
        <div>
          <button class="btn btn-primary col-2" @click="addStudent"> {{ loading ? 'Saving..' : 'Save' }}</button>
          <button class="btn btn-danger col-2"> Cancel</button>
          <button v-if="submitted" class="btn offset-1 col-5" style="background: #d4edda;">  <strong> Added Successfully</strong></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    auth,
    StoreDB
  } from '@/services/fireinit.js'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'
  export default {
    props: ['displayAdd'],
    data() {
      return {
        loading: false,
        form: {
          name: '',
          matric: '',
          phone: '',
          gender: ''
        },
        submitted: false
      }
    },
    methods: {
      async addStudent() {
        this.loading = true
        try {
          this.$v.$touch();
          if (this.$v.$invalid) {
            this.loading = false
            return;
          }
          await StoreDB.collection("students").add({
            name: this.form.name,
            matric: this.form.matric,
            gender: this.form.gender,
            phone: this.form.phone,
          });
          this.loading = false
          this.submitted = true
          this.resetForm()
          this.$store.dispatch('getStudents');
        } catch (error) {
          this.loading = false
          error.message
        }
      },
      resetForm() {
          this.form = {name:'',matric:'',phone:'',gender:''}
      }
    },
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(4)
        },
        matric: {
          required,
          minLength: minLength(11)
        },
        phone: {
          required
        },
        gender: {
          required
        }
      },
    }
  }

</script>

<style>

</style>
