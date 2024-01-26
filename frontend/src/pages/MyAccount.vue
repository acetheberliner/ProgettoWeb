<script lang="ts">
import axios from "axios";
import { PropType, defineComponent } from "vue";
import { User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  data() {
    return {
      passMod: "setmod",
      passinput: ""
    }
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout");
      window.location.href="/";
    },

    // async setMod(passinput: string) {
    //   if(passinput == this.passMod){
    //     await axios.post("/api/auth/setmod");
    //   }else{
    //     alert("Errore");
    //   }
    // }
  },
});
</script>

<template>
  <h1 v-if="user?.role == 'mod'">Profilo <span :class="{
    'bg-warning': user?.role == 'mod'
  }">Moderatore</span></h1>
  <h1 v-else>Profilo Utente</h1>
  <main>
    <article>
      <div class="user-image">
        <img id="user" src="/user.svg" alt="User image empty">
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
    <div class="animation">
      <lottie-player src="https://lottie.host/734e9cf7-ddf2-4380-a671-99d11d4a6240/JauVdy6sdh.json" background="transparent" speed="1" style="width: 550px; height: 550px" direction="1" mode="normal" loop autoplay></lottie-player>
    </div>
    <!-- <div class="moderator">
      <p>Password Moderatore:</p>
      <input type="text" name="password" id="password" placeholder="Password" v-model="passinput">
      <button type="submit" class="submit btn btn-outline-light">Invia</button>
    </div> -->
  </main>
</template>

  
<style scoped>
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
    margin-left: 29em;
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


* {
  font-family: "Montserrat", sans-serif;
}

img, svg {
  width: 25px;
  margin: 0px;
}

/* .moderator{
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
  text-align: center;
  backdrop-filter:blur(20px);
  box-shadow: rgb(100, 170, 245) 0px 20px 30px -10px;
  align-items: center;
} */

/* input {
  border: white;
  border-radius: 10px;
  padding: 1vh;
  margin-bottom: 5px;
  text-align: center;
  background-color: transparent;
  color: white;
}

input::placeholder {
  color: white;
  opacity: 0.5;
} */

.submit {
  cursor: pointer;
  text-transform: uppercase;
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
  width: 85px;
  margin: 10px;
  padding: 1vh;
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

/*---------------------------------------------------------------------------- */
</style>
