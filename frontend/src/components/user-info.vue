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
        <img id="logout" src="/logout.svg" alt="Logout" @click="logout"/>
      </div>

</template>

<style scoped>

@media screen and (min-width: 768px){
  .profile{
    width: fit-content;
    height: fit-content;
  }
}

* {
  font-size: 20px;

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
