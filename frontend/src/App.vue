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
      <nav class="container">
        <div class="header-logo">
          <p><img src="/PaperFileText.svg" alt="" />Note<span>Sync</span></p>
        </div>
        <RouterLink class="nav-link button glow-button btn1" to="/"
          >Home</RouterLink
        >
        <RouterLink class="nav-link button glow-button btn2" to="/explore"
          >Esplora</RouterLink
        >
        <div class="auth">
          <UserInfo v-if="user" :user="user" />
          <template v-else>
            <RouterLink class="nav-link button" to="/login">Login</RouterLink>
            <RouterLink class="nav-link button" to="/register"
              >Registrati</RouterLink
            >
          </template>
        </div>
      </nav>
      <RouterView :user="user" />
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

* {
  font-family: "Montserrat", sans-serif;
}

.auth {
  display: flex;
}

UserInfo {
  font-size: 20px;
}

body,
html {
  margin: 0px;
  padding: 0;
  height: 100%;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

img {
  height: 50px;
  width: 50px;
  aspect-ratio: 40/40;
  object-fit: cover;
  margin-right: 15px;
}

img:not(:hover) {
  opacity: 0.8;
}

.full-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.header-logo > p {
  font-weight: bold;
  font-style: italic;
  font-size: 45px;
  font-family: myFirstFont;
  text-transform: uppercase;
  color: rgb(209, 233, 236);
  margin: 0px;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}

span {
  color: #169df7;
  font-style: italic;
  background: linear-gradient(to right, #0af3e0 0%, #0985eb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@font-face {
  font-family: myFirstFont;
  src: url("/fonts/junegull.otf");
}

main {
  padding: 40px; /* Aggiungi spazio sopra il contenuto per non sovrapporre la nav-bar */
  color: #fff; /* Cambia il colore del testo per contrastare con l'immagine di sfondo */
  /* background-image: url("../../public/Cloudy.svg"); */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)),
    url(/Cloudy.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100%; /* Imposta l'altezza per rendere visibile il contenuto */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
}

.container {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  min-width: 100%;
  box-sizing: border-box;
  background: transparent;
  /* background-color: #024454;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
}

.header-logo {
  margin-right: 10px; /* Adjust spacing between the logo and text as needed */
  margin: 30px;
}

nav .nav-link {
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff; /* Colore del testo */
  font-size: 20px;
  font-weight: bold;
  padding: 8px 12px; /* Spaziatura interna */
  border-radius: 5px; /* Bordo arrotondato */
  transition: background-color 0.3s ease; /* Effetto di transizione sul cambio di colore */
}

/* nav .nav-link:hover {
  background-color: #1b5e20; /* Colore di sfondo quando il link è in hover
} */

.button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

.btn1:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #c6d8ff;
  background: linear-gradient(to right, #fff 0%, #c6d8ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.btn2:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #1265da;
  background: linear-gradient(to right, #fff 0%, #c6d8ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.btn3:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #6b5ca5;
  background: linear-gradient(to right, #fff 0%, #c6d8ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.btn4:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #ee42c0;
  background: linear-gradient(to right, #fff 0%, #c6d8ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

main {
  flex: 1;
  padding: 0px;
}
</style>
