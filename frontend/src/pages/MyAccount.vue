<script lang="ts">
import axios from "axios";
import { PropType, defineComponent } from "vue";
import { Nota, User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
    nota: {
      type: Object as () => Nota,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      userNotes: [] as Nota[]
    }
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout");
      window.location.href="/";
    },
    
    async fetchUserNotes() {
      try {
        const response = await axios.get(`/api/usernote/${this.user?.username}`);
        this.userNotes = response.data;
      } catch (error) {
        console.error("Errore durante il recupero delle note dell'utente", error);
      }
    },

    async visualizzaNota(idnote: number) {
      this.$router.push({ 
        path: `/view/${idnote}`
      });
    }
  },
  mounted(){
    this.fetchUserNotes();
  }
});
</script>

<template>
  <h1 v-if="user?.role == 'mod'">Profilo <span id="usermod" :class="{'bg-warning font-italic': user?.role == 'mod'}">Moderatore</span></h1>
  <h1 v-else>Profilo Utente</h1>
  <main>
    <!----------------------------------------------------------------------------------------------------------------->
    <div class="page">
      <article>
        <div class="user-image">
          <img v-if="user?.role == 'user'" id="user" src="/user.svg" alt="User image empty">
          <img v-else id="user" src="/crown.svg" alt="User image empty">
        </div>
        <div class="title">
          <h2>Bentornato</h2>
          <h2 class="username">{{ user?.username }}!</h2>
        </div>
        <div class="ruolo">
          <p class="role" v-if="user?.role == 'mod' ">Ruolo: <span class="role">Moderatore</span></p>
          <p class="role" v-else>Ruolo: <span class="role">Utente</span></p>
        </div>
        <button @click="logout()" class="btn btn-outline-danger"><img id="logout" src="/logout.svg" alt="Logout"/></button>
      </article>
      <!----------------------------------------------------------------------------------------------------------------->
      <div class="animation">
        <lottie-player src="https://lottie.host/734e9cf7-ddf2-4380-a671-99d11d4a6240/JauVdy6sdh.json" background="transparent" speed="1" style="width: 550px; height: 550px" direction="1" mode="normal" loop autoplay></lottie-player>
      </div>
      <!----------------------------------------------------------------------------------------------------------------->
      <div class="personal-notes">
        <h1>Le tue note</h1>
        <hr>
        <div class="single-note" v-for="nota in userNotes" :key="nota.idnote">
          <a class="note-button" @click="visualizzaNota(nota.idnote)">
            <p class="note-title"><img id="document" src="/paper-document-svgrepo-com.svg" alt="" />{{ nota.titolo }}</p>
            <!----------------------------------------------------------------------------------------------------------------->
            <p v-if="nota.stato == 'approvata'" class="stato bg-success text-white">{{ nota.stato }}</p>
            <p v-if="nota.stato == 'da approvare'" class="stato bg-warning text-dark">{{ nota.stato }}</p>
            <p v-if="nota.stato == 'rifiutata'" class="stato bg-danger text-white">{{ nota.stato }}</p>
            <!----------------------------------------------------------------------------------------------------------------->
            <!-- <p v-if="nota.stato == 'rifiutata'" class="comment">*MOD: {{ nota.commento }}</p> -->
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
}

@media screen and (max-width: 1300px){
  .user-image {
    display: flex;
    justify-content: center;
  }

  .ruolo{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/*------------------------------------------------------------------------------------ */

@media screen and (min-width: 1301px){
  main {
    display: flex;
    flex-direction: row;
    place-items: center;
  }
  
  article {
    font-size: 16px;
    margin: 0;
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    padding: 4vh;
    border: 1px solid white;
    border-radius: 10px;
    background:transparent;
    place-items: center;
    backdrop-filter:blur(20px);
    box-shadow: rgb(100, 170, 245) 0px 20px 30px -10px;
  }

  .animation{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10em;
    margin-right: 4em;
  }
}
/*------------------------------------------------------------------------------------ */

main {
  display: flex;
  justify-content: center;
}

.page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

span#usermod {
  border-radius: 15px;
  padding: 5px;
  vertical-align: middle;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  cursor: default;
}

img, svg {
  width: 25px;
  margin: 0px;
}

.ruolo {
  border: 1px solid rgb(255, 255, 255);
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
  padding: 0.4em;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
  cursor: default;
}

.ruolo:hover {
  transform: scale(1.2);
}

p.role {
  color: rgb(255, 255, 255);
  margin: 0;
  font-weight: bold;
}

span.role{
  color: white;
  text-transform: uppercase;
}

span.role:hover {
  color: #ffa600;
  font-weight: bold;
}

img#user{
  width: 100px;
  margin: 10px;
  padding: 1.5vh;
  border: 3px solid white;
  border-radius: 50px;
}


h1 {
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 36px;
}

button {
  width: 60%;
  border-radius: 100px;
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.2);
}

.title {
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: 38px;
}

h2.username{
  color: #ffa600;
  filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.884));

}

div.personal-notes {
  border: 1px solid white;
  border-radius: 10px;
  backdrop-filter:blur(20px);
  box-shadow: rgb(168, 184, 201) 0px 10px 30px -10px;
  padding: 4vh;
  max-height: 60vh;
  overflow-y: scroll;
}

hr {
  border: 1px solid white;
  border-radius: 50px;
}

.single-note {
  border: 1px solid white;
  border-radius: 10px;
  padding: 0.8em;
  margin-bottom: 0.8em;
  background-color: white;
  color: #235971;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
}

.single-note:hover {
  transform: scale(1.08);
}

img#document{
  width: 35px;
  margin-right: 5px;
}

p.note-title {
  margin: 0px;
}

p.stato {
  text-transform: uppercase;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  font-size: 13px;
  margin-bottom: 0px;
  margin-top: 10px;
  box-shadow: rgb(29, 44, 59) 0px 10px 20px -10px;
}

p.comment {
  color: red;
  font-weight: bold;
  font-style: italic;
  font-size: 15px;
  padding-top: 5px;
  margin-bottom: 0px;
}

.note-button {
  border: none;
}

/*- SCROLLBAR -----------------------------------------------------------------------------------------------------------------------------------*/
.personal-notes {
  --sb-thumb-color: #ffffff;
  --sb-track-color: #2568bf00;
  --sb-size: 6px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  overflow-y: scroll;
  cursor: pointer;
}

.personal-notes::-webkit-scrollbar {
  width: var(--sb-size);
}

.personal-notes::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 12px;
}

.personal-notes::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 12px;
}

</style>
