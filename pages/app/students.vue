<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap  align-items-center border-bottom">
      <h1 class="h2">Students</h1>
      <button class="btn btn-success push-right col-md-1 col-sm-3" v-if="type!='add'" @click="type='add'"> <i
          class="fa fa-plus"></i> Add New</button>
      <button class="btn btn-primary push-right col-md-2 col-sm-3" v-if="type!='view'" @click="type='view'">
         <i class="fa fa-users"></i> All Students</button>
    </div>
    <div class="row mt-2">
      <div class="col-md-4"></div>
      <AddStudent :display-add="displayAdd" />
    </div>
    <div class="row mt-2" v-if="displayAll">
      <table class="table table-bordered table-striped col-md-10 offset-md-1">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FullName</th>
            <th scope="col">Matric No</th>
            <th scope="col">Phone No</th>
            <th scope="col">Gender</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.matric }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.gender.toUpperCase() }}</td>
            <td>
                <button class="btn btn-info"><i class="fa fa-eye"></i></button>
                <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
                <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
  import AddStudent from '@/components/app/AddStudent';
  export default {
    layout: 'app',
    components: {
      AddStudent
    },
    data() {
      return {
        type: '',
        displayAdd: false,
        displayAll: false,
      }
    },
    watch: {
      type(value) {
        switch (value) {
          case 'view':
            this.displayAdd = false
            this.displayAll = true
            break;
          case 'add':
            this.displayAdd = true
            this.displayAll = false
            break;

          default:
            break;
        }
      }
    },
    mounted() {
        this.type = 'view';
    },
    computed: {
        students() {
            return this.$store.getters.allStudents
        }
    }
  }

</script>

<style>

</style>
