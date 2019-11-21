<template>
  <div>
    <Navbar />
    <div class="jumbotron jumbotron-fluid">
      <div class="container text-center">
        <h1 class="display-4 text-white">dAttender</h1>
        <p class="lead text-white">This is a modified jumbotron that occupies the entire horizontal space of its parent.
        </p>
      </div>
    </div>
    <div>
      <div class="container center-block my-auto mb-5">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2" v-for="post in posts" :key="post.id">
            <div class="card">
              <img :src="`https://picsum.photos/200/200?random=${post.id}`" class="card-img-top" alt="...">
              <div class="card-body">
                <p class="card-text">{{ post.content }}</p>
              </div>
              <div class="card-footer" style="background: #16446d">
                <small class="text-white font-weight-bold">{{ post.title }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  export default {
    components: {
      Navbar
    },
    computed: {
      posts() {
        return this.$store.getters.allPosts
      }
    }
  }

</script>

<style scoped>
  .jumbotron {
    background: url('/images/far-cry.jpeg') no-repeat center center/cover;
    height: 300px;
  }

</style>
