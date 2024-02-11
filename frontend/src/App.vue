<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import UserInfo from "./components/user-info.vue";
import { User } from "./types";

export default defineComponent({
  components: { UserInfo },
  data() {
    return {
      user: null as User | null,
    };
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/profile");
      this.user = res.data;
    },
  },
  mounted() {
    this.getUser();
  },
});
</script>

<template>
<div class="full-page">
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <nav id="nav" class="container-fluid">
            <div class="header-logo col-12 col-md-2">
              <RouterLink to="/" class="routerlink">
                <div class="title">
                  <p>Note<span>Sync</span></p><br>
                </div>
              </RouterLink>
            </div>
            <div class="navigation ">
              <RouterLink class="nav-link button col-6" to="/explore">Appunti</RouterLink>
              <RouterLink class="nav-link button col-6" to="/aggiungi" v-if="user" :user="user">Aggiungi</RouterLink>
            </div>
            <div class="auth">
              <UserInfo v-if="user" :user="user" />
              <template v-else>
                <RouterLink class="nav-link button col-6" to="/login">Accedi</RouterLink>
                <RouterLink class="nav-link button col-6" to="/register">Registrati</RouterLink>
              </template>
            </div>
          </nav>
        </div>
      </div>
      <div class="row"><br></div>
    </div>
    <RouterView :user="user" />
  </main>
</div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

* {
  font-family: "Montserrat", sans-serif;
}

@media screen and (max-width: 1550px){
  .header-logo {
    text-align: center;
    margin-top: 25px;
  }

  .navigation{
    text-align: center;
    justify-content: center;
  }
  .auth {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 1em;
  }

  .nav-link{
    border: 1px solid rgba(255, 255, 255, 0.356);
    border-radius: 10px;
  }

  .header-logo > p {
    text-align: center;
  }
}
/*------------------------------------------------------------------------------------ */

@media screen and (min-width: 1551px){
  
  main {
    padding: 0;
    background-size: 100% 100%;
  }

  #nav{
    display: flex;
    z-index: 1;
    height: 100%;
  }

  .navigation{
    justify-content: space-evenly;
    margin-top: 10px;
  }

  .auth {
    display: flex;
    position: absolute;
    right: 1.5em;
    top: 1em;
  }

  .col-6{
    flex: 0 0 0;
    height: fit-content;
    max-width: 100%;
    transition: all 0.2s ease-in-out;
  }

  .nav-link {
    border-radius: 10px;
  }
}
/*------------------------------------------------------------------------------------ */
body {
  --sb-thumb-color: #ffffff;
  --sb-track-color: #2568bf00;
  --sb-size: 8px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  overflow-y: scroll;
  cursor: pointer;
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track{
  background: var(--sb-track-color);
  border-radius: 12px;
}

body::-webkit-scrollbar-thumb{
  background: var(--sb-thumb-color);
  border-radius: 12px;
}
/*------------------------------------------------------------------------------------ */

body {
  margin: 0px;
  padding: 0;
  height: 140%;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.full-page {
  height: 100vh;
}

.title {
  transition: all 0.2s ease-in-out;
}

.title:hover, .routerlink:hover {
  text-decoration: none;
  transform: scale(1.2);
}

.header-logo > .routerlink > .title > p {
  font-weight: bold;
  font-style: italic;
  font-size: 45px;
  font-family: myFirstFont;
  text-transform: uppercase;
  color: rgb(209, 233, 236);
  margin: 0px;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}

.navigation {
  display: flex;
}

nav{
  margin-top: 1em;
}

span {
  color: #169df7;
  font-style: italic;
  background: linear-gradient(to right, #0af3e0 0%, #0985eb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  overflow-x: visible;
}

p {
  z-index: 10000;
  overflow-x: visible;
}

@font-face {
  font-family: myFirstFont;
  src: url("/fonts/junegull.otf");
}

main {
  padding: 40px;
  color: #fff;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(/Cloudy.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px;
}

nav .nav-link {
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 12px;
}

.col-6:hover{
  transform: scale(1.1);
}

.button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  font-weight: normal;
  text-transform: uppercase;
}

.button:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #c5c9ce;
  background: linear-gradient(to right, #fff 0%, #c6d8ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>