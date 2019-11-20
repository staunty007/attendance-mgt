export default function ({ store, redirect, route }) {
    store.state.user != null && route.name == 'login'  ? redirect('/app') : ''
    store.state.user != null && route.name == 'register'  ? redirect('/app') : ''
    store.state.user == null && isUserRoute(route) ? redirect('/login') : ''
  }
  
  function isUserRoute(route) {
    if (route.matched.some(record => record.path == '/app')) {
      return true
    }
  }