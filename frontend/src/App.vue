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
              <!-- <img src="/PaperFileText.svg" alt="" /> -->
              <p>Note<span>Sync</span></p><br>
            </div>
            <div class="navigation ">
              <RouterLink class="nav-link button btn1 col-6" to="/">Home</RouterLink>
              <RouterLink class="nav-link button btn2 col-6" to="/explore">Appunti</RouterLink>
            </div>
            <div class="auth">
              <UserInfo v-if="user" :user="user" />
              <template v-else>
                <RouterLink class="nav-link button btn3 col-6" to="/login">Accedi</RouterLink>
                <RouterLink class="nav-link button btn4 col-6" to="/register">Registrati</RouterLink>
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

@media screen and (max-width: 1550px){
  .header-logo {
    text-align: center;
    margin-top: 25px;
  }

  .navigation{
    text-align: center;
    justify-content: center;
  }

  /* .auth {
    justify-content: center;
    text-align: center;
    margin-top: 30px;
  } */

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
    padding: 0; /* Rimuovi il padding */
    background-size: 100% 100%; /* Copri completamente l'area del main */
  }
  #nav{
    display: flex;
    z-index: 1;
    height: 100%; /* Imposta l'altezza al 100% della viewport */
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

  UserInfo {
    font-size: 20px;
    float: right;
  }

  btn1, btn2, btn3, btn4 {
    color: white;
    height: fit-content;
    width: fit-content;
  }

  .col-6{
    flex: 0 0 0;
    height: fit-content;
  }

  .nav-link {
    border-radius: 10px;
  }
}

/*------------------------------------------------------------------------------------ */

* {
  font-family: "Montserrat", sans-serif;
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

nav .nav-link {
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff; /* Colore del testo */
  font-size: 20px;
  font-weight: bold;
  padding: 8px 12px; /* Spaziatura interna */
  /* border-radius: 5px; Bordo arrotondato */
  transition: background-color 0.3s ease; /* Effetto di transizione sul cambio di colore */
}

.button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  /* border-radius: 4px; */
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
