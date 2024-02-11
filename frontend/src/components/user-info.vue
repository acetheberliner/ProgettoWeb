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
      if(confirm("Conferma disconnessione")){
        await axios.post("/api/auth/logout");
        window.location.href="/";
      }
    },
  },
});
</script>

<template>
  <RouterLink to="/myaccount" class="routerlink">
    <div class="profile">
      <span id="user" v-if="user?.role == 'mod'" class="text-sm text-warning">{{ user?.username }}</span>
      <span id="user" v-else class="text-sm">{{ user?.username }}</span>
      <img v-if="user?.role == 'mod'" src="/crown.svg" alt="mod" />
      <img v-else src="/user.svg" alt="user" />
    </div>
  </RouterLink>
  <img id="logout" src="/logout.svg" alt="Logout" @click="logout()"/>
</template>

<style scoped>
* {
  font-size: 20px;
  text-decoration: none;
}

@media screen and (min-width: 768px){
  .profile{
    width: fit-content;
    height: fit-content;
    vertical-align: middle;
  }
}

span#user{
  cursor: default;
  background: white;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  cursor: pointer;
}

.profile{
  border: 2px solid white;
  border-radius: 15px;
  margin-right: 25px;
  width: fit-content;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: rgb(29, 44, 59) 0px 20px 30px -10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.profile:hover {
  transform: scale(1.1);
}

span {
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

img#logout{
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

img#logout:hover{
  transform: scale(1.3);
}

.routerlink:hover {
  text-decoration: none;
}
</style>
