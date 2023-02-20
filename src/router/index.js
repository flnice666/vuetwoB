import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Home from '../views/Home'
import User from '../views/User'
import Login from '../views/Login'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            { path: '/home', component: Home },
            { path: '/user', component: User },
            // { path: '/mail', component: Mail },
            // { path: '/page1', component: PageOne },
            // { path: '/page2', component: PageTwo }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes,
})
export default router