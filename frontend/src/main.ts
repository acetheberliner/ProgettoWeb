import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue';
import Esplora from './pages/Esplora.vue';

const router: Router = createRouter ({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path: "/login", component: Login},
        {path: "/explore", component: Esplora}
    ]
});

createApp(App)
    .use(router)
    .mount("#app")
