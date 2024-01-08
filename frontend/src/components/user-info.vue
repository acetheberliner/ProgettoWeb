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
  <span class="text-sm">{{ user?.username }}</span>
  <button class="btn !px-2 btn-outline" @click="logout">Logout</button>
</template>

<style scoped>
* {
  font-size: 20px;
  display: flex;
}

span {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  border: 1px solid white;
  width: fit-content;
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
