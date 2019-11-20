import {auth,StoreDB,
  
   GoogleProvider} from '@/services/fireinit.js'

export const state = () => ({
  user: null,
  profile: null,
  posts: '',
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
  }
};

export const actions = {
  autoSignIn ({commit}, user) {
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

  signInWithEmail({commit, dispatch}, payload) {
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
  }
};

export const getters = {
  activeUser: (state) => {
    return state.user
  },
  allPosts: (state) => {
    return state.posts
  }
};