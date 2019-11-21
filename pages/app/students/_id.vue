<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div class="row">
      <div class="col-md-6 offset-md-1">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img :src="`https://picsum.photos/200/200?random=${user.id}`" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-uppercase font-weight-bold">{{ user.name }}</h5>
                <p class="card-text">This is a wider card with supporting text below as a.</p>
                <p class="card-text"><span class="font-weight-bold">Matric-No:</span>
                     {{ user.matric }}
                </p>
                <p class="card-text"><span class="font-weight-bold">Phone-No:</span>
                     {{ user.phone }}
                </p>
                <p class="card-text"><span class="font-weight-bold">Gender:</span>
                     {{ user.gender.toUpperCase() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    layout: 'app',
    // validate({
    //   params
    // }) {
    //   // Must be a number
    //   return /^\d+$/.test(params.id)
    // }
    computed:{
        user() {
            const student =  this.$store.getters.allStudents.filter(e => e.id == this.$route.params.id);
            return student[0];
        }
    },
  }

</script>

<style>

</style>
