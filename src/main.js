import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui';
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

Vue.use(element);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token');
  console.log(to, from,token, '路由前置守卫');
  if(!token && to.name !== 'login'){
    next({name: 'login'});
  }else if(token && to.name === 'home'){
    next({name:'home'});
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
