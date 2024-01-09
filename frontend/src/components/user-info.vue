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
      window.location.reload();
    },
  },
});
</script>

<template>
  <div class="profile">
    <span id="user" class="text-sm">{{ user?.username }}</span>
    <img src="/user.svg" alt="user" />
    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg> -->
    <img id="logout" src="/logout.svg" alt="Logout" @click="logout"/>
  </div>
</template>

<style scoped>
* {
  font-size: 20px;
  display: flex;
}

span#user{
  cursor: default;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.profile{
  border: 2px solid white;
  border-radius: 15px;
  margin-right: 25px;
  width: fit-content;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: rgb(29, 44, 59) 0px 20px 30px -10px;
}

span {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

img {
  width: 35px;
  margin: 0px;
}

svg{
  width: 30px;
  height: 30px;
}

img#logout{
  cursor: pointer;
}

button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}
</style>
