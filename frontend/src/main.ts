// import axios from "axios";
import { createApp } from "vue";
import { createRouter, createWebHistory, Router } from "vue-router";
import App from "./App.vue";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Esplora from "./pages/Esplora.vue";
import Register from "./pages/Register.vue";
import MyAccount from "./pages/MyAccount.vue";
import DoANote from "./pages/DoANote.vue";
import NotFound from "./pages/NotFound.vue";

// import { User } from "./types";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/explore", component: Esplora },
    { path: "/register", component: Register },
    { path: "/myaccount", component: MyAccount },
    { path: "/doanote", component: DoANote },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

// Funzione che viene eseguita prima di ogni navigazione del router
// router.beforeEach(async (to) => {
//   const res = await axios.get("/api/auth/profile");
//   const user = res.data as User | null;
//   // Se la pagina richiede il login, ma l'utente non l'ha effettuato, lo rimanda alla pagina di login
//   if (to.meta.requireLogin && !user) {
//     return { path: "/login" };
//   }
//   // Se la pagina richiede il logout, ma l'utente ha effettuato l'accesso, lo rimanda alla home
//   if (to.meta.requireLogout && user) {
//     return { path: "/" };
//   }
// });

createApp(App).use(router).mount("#app");
