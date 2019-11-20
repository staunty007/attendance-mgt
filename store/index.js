import {auth,StoreDB,
  
   GoogleProvider} from '@/services/fireinit.js'

export const state = () => ({
  user: null,
  profile: null,
  posts: '',
  students:'',
});

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setPost (state, payload) {
    state.posts = payload
  },
  setStudents (state, payload) {
    state.students = payload
  }
};

export const actions = {
  autoSignIn ({commit, dispatch}, user) {
    StoreDB.collection('users').doc(user.uid).get().then(doc => {
      commit('setProfile', doc.data());
    })
    commit('setUser', JSON.parse(JSON.stringify(user)))
  },
  
  signUpWithEmail({dispatch}, payload) {
    dispatch('autoSignIn', payload.user)
    console.log(payload.user);
    $nuxt.$router.push('/app');
  },

  signInWithEmail({dispatch}, payload) {
    dispatch('autoSignIn', payload.user)
     console.log(payload.user);
     $nuxt.$router.push('/app');
  },
  
  signInWithGoogle ({commit}) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },

  signOut ({commit}) {
    auth.signOut().then(() => {
      commit('setUser', null)
      commit('setProfile', null)
      $nuxt.$router.push('/login');
    }).catch(err => console.log(error))
  },

  async getPosts ({commit})  {
    await StoreDB.collection('posts').get().then(res => {
      const allPosts = [];
      res.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        allPosts.push(post);
      })
      commit('setPost', allPosts);
    });
  },
  async getStudents ({commit})  {
    await StoreDB.collection('students').get().then(res => {
      const allStudents = [];
      res.forEach(doc => {
        let student = doc.data()
        student.id = doc.id
        allStudents.push(student);
      })
      commit('setStudents', allStudents);
    });
  }
};

export const getters = {
  activeUser: (state) => {
    const nUser = state.user
    nUser != null ?  nUser.profile = state.profile : state.user
    return nUser
  },
  allPosts: (state) => {
    return state.posts
  },
  allStudents: (state) => {
    return state.students
  }
};