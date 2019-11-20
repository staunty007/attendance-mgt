<template>
  <div>
    <Navbar />
    <div>
      <div class="col-3 offset-md-4 mt-5">
        <h3 class="text-uppercase font-weight-bold text-dark text-center mb-5">Register</h3>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Full Name</label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fa fa-user"></i></div>
              </div>
              <input type="text" class="form-control" v-model="form.name">
            </div>
            <small class="form-text text-muted text-danger"></small>
          </div>
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
          <button type="button" @click="emailLogin" class="btn btn-secondary col-md-6 offset-md-3">{{ loading ? 'Registering...' : 'Register' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    auth, StoreDB
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
          name: '',
          email: '',
          password: ''
        },
        error: []
      }
    },
    methods: {
     async emailLogin() {
        this.loading = true
        this.error = []
        try {
          const response = await auth.createUserWithEmailAndPassword(this.form.email, this.form.password);
          await StoreDB.collection('users').doc(response.user.uid).set({ name: this.form.name });
          this.loading = false
          this.$store.dispatch('signInWithEmail', response);
          console.log('Login Successfull');
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
