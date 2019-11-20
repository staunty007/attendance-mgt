<template>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 border-bottom">
          <h1 class="h2">Dashboard</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"></span>
              This week
            </button>
          </div>
        </div>

        <div class="accordion" id="accordionExample">
          <div class="card" v-for="post in posts" :key="post.title">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse' + post.id"
                  aria-expanded="true" aria-controls="collapse">
                  {{ post.title }}
                </button>
              </h2>
            </div>

            <div :id="'collapse' + post.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">
                {{ post.content }}
              </div>
            </div>
          </div>
        </div>

      </main>
</template>

<script>
  import {
    auth,
    StoreDB
  } from '@/services/fireinit.js'
  export default {

    data() {
      return {
        
      }
    },
    methods: {
    },
    computed: {
      user() {
        return this.$store.getters.activeUser;
      },
      posts() {
        return this.$store.getters.allPosts;
      }
    },
    mounted() {
        
    },
    layout: 'app'
  }

</script>

<style>

</style>
