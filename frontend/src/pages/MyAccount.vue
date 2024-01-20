<script lang="ts">
import axios from "axios";
import { PropType, defineComponent } from "vue";
import { User } from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout");
      window.location.href="/";
    },
  },
});
</script>

<template>
  <h1>Profilo Utente</h1>
  <main>
    <article>
      <div class="user-image">
        <img id="user" src="/user.svg" alt="User image empty">
      </div>
      <div class="title">
        <h2>Bentornato,</h2>
        <h2 class="username">{{ user?.username }}!</h2>
      </div>
      <div class="buttons">
        <!-- <div class="create">
          <button class="btn btn-outline-success"><img id="logout" src="/plus.svg" alt="Logout" @click="logout"/></button>
        </div> -->
        <div class="logout">
          <button class="btn btn-outline-danger"><img id="logout" src="/logout.svg" alt="Logout" @click="logout"/></button>
        </div>
      </div>
    </article>  
    <div class="animation">
      <lottie-player src="https://lottie.host/734e9cf7-ddf2-4380-a671-99d11d4a6240/JauVdy6sdh.json" background="transparent" speed="1" style="width: 550px; height: 550px" direction="1" mode="normal" loop autoplay></lottie-player>
    </div>
  </main>
</template>

  
<style scoped>
@media screen and (max-width: 1300px){

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
    margin-left: 25em;
    padding: 4vh;
    border: 1px solid white;
    border-radius: 10px;
    background:transparent;
    text-align: center;
    backdrop-filter:blur(20px);
    box-shadow: rgb(100, 170, 245) 0px 20px 30px -10px;
  }

  .animation{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10em;
  }
}
/*------------------------------------------------------------------------------------ */

* {
  font-family: "Montserrat", sans-serif;
}

img {
  width: 25px;
  margin: 0px;
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

.buttons {
  display: inline-flex;
  justify-content: center;
}

.logout {
  width:100%
}

button {
  margin: 10px;
  width: 60%;
  border-radius: 100px;
}

.title {
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: 38px;
}

h2.username{
  color: rgb(255, 166, 0);
  filter: drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.884));

}

/*---------------------------------------------------------------------------- */
</style>
