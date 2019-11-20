<template>
  <div>
    <Navbar />
    <div>
      <div class="col-3 offset-md-4 mt-5">
        <h3 class="text-uppercase font-weight-bold text-dark text-center mt-5 mb-5">LOGIN</h3>
        <p class="text-danger text-center" v-if="error">{{ error.message }}</p>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-envelope"></i></div>
              </div>
              <input type="email" class="form-control" v-model="form.email">
            </div>
            <small class="form-text text-muted text-danger"></small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-lock"></i></div>
              </div>
              <input type="password" class="form-control" v-model="form.password">
            </div>
            <small class="form-text text-muted text-danger"></small>
          </div>
          <button type="button" @click="emailRegister"
            class="btn btn-primary col-md-6 offset-md-3">
            Login <i class="" :class="{ 'fa fa-spinner fa-spin': loading }"></i></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    auth
  } from '@/services/fireinit.js'
  import Navbar from '@/components/Navbar'
  export default {
    middleware: 'authenticated',
    components: {
      Navbar
    },
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        },
        error: []
      }
    },
    methods: {
      async emailRegister() {
        this.loading = true
        this.error = []
        try {
          const user = await auth.signInWithEmailAndPassword(this.form.email, this.form.password);
          this.loading = false
          this.$store.dispatch('signInWithEmail', user);
          //console.log('Login Successfull');
        } catch (error) {
          this.loading = false
          this.error = error
        }
      }
    }
  }

</script>

<style scoped>
</style>
