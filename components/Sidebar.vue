<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link class="nav-link active text-uppercase" to="/app">
            <i class="fa fa-tachometer text-primary"></i>
            Dashboard <span class="sr-only">(current)</span>
          </nuxt-link>
        </li>
        <li class="nav-item  text-uppercase">
          <nuxt-link class="nav-link" to="/app/students">
            <i class="fa fa-users text-success"></i>
            STUDENTS
          </nuxt-link>
        </li>
        <li class="nav-item  text-uppercase">
          <nuxt-link class="nav-link" to="/posts">
            <i class="fa fa-users"></i>
            POSTS
          </nuxt-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted d-none">
        <span>Saved reports</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2 d-none">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Current month
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {

  }

</script>

<style>

</style>
