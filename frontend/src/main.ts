import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Esplora from './pages/Esplora.vue'
import Register from './pages/Register.vue'
import MyAccount from './pages/MyAccount.vue'
import DoANote from './pages/DoANote.vue'
import NotFound from './pages/NotFound.vue'

const router: Router = createRouter ({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path: "/login", component: Login},
        {path: "/explore", component: Esplora},
        {path: "/register", component: Register},
        {path: "/myaccount", component: MyAccount},
        {path: "/doanote", component: DoANote},
        {path: "/:pathMatch(.*)*", component: NotFound}
    ]
});

createApp(App)
    .use(router)
    .mount("#app")
