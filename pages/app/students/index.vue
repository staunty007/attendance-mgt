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
      <table class="example table table-bordered table-striped col-md-10 offset-md-1">
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
              <nuxt-link type="button" :to="'/app/students/' + student.id" class="btn btn-info"><i
                  class="fa fa-eye"></i></nuxt-link>
              <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
              <button class="btn btn-danger" @click="openDeleteModal(student)"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade bd-example-modal-sm delete-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirm Delete <br>
              <span class="text-primary">{{ isConfirmedName.name }}</span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row d-flex justify-content-between">
                <button type="button" class="btn btn-warning" data-dismiss="modal" @click="isConfirmed = false">Cancel</button>
                <button type="button" class="btn btn-danger" @click="isConfirmed = true">{{ loading ? 'Deleting' : 'Delete' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import AddStudent from '@/components/app/AddStudent';
  import {
    StoreDB
  } from '@/services/fireinit.js'
  export default {
    layout: 'app',
    components: {
      AddStudent
    },
    data() {
      return {
        type: '',
        loading:false,
        displayAdd: false,
        displayAll: false,
        isConfirmed: false,
        isConfirmedName: {},
      }
    },
    methods: {
      openDeleteModal(student) {
        this.isConfirmedName = student
        $('.delete-modal').modal('show');
        if (this.isConfirmed == true) {
            console.log("holla");
            this.deleteStudent(student);
        }
      },
      async deleteStudent(student) {
          this.loading = true;
       await StoreDB.collection("students").doc(student.id).delete().then(() => {
           this.loading = false;
            console.log("Document successfully deleted!");
            $('.delete-modal').modal('hide');
            this.$store.dispatch('getStudents');
        }).catch((error) => {
            this.loading = false;
          console.error("Error removing document: ", error);
        });
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
      },
      isConfirmed(value) {
          if (value == true) {
            this.deleteStudent(this.isConfirmedName);
          } else {
            $('.delete-modal').modal('hide');
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
