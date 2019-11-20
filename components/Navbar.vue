<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <nuxt-link class="navbar-brand" to="/">
      dAttender
    </nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mr-auto ml-5">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/">HOME <span class="sr-only">(current)</span></nuxt-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">ABOUT</a>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">SERVICES</nuxt-link>
        </li>

      </ul>


      <ul class="navbar-nav ml-auto mr-5" v-if="user == null">
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/login">LOGIN</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/register">REGISTER</nuxt-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto mr-5" v-else>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/app">DASHBOARD</nuxt-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {{ user.email }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <nuxt-link class="dropdown-item" to="/">Profile</nuxt-link>
            <a class="dropdown-item" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.getters.activeUser
      }
    },
    methods: {
      async logout() {
        await this.$store.dispatch('signOut').then(() => {
          console.log("Logout Successful");
        })
      }
    }
  }

</script>

<style scoped>
  .bg-dark {
    background-color: #16446d!important;

  }
  .bg-light {
    background-color: #d4d9dd!important;
  }

  .navbar-brand {
    background-color: transparent;
    box-shadow: none;
  }

</style>
