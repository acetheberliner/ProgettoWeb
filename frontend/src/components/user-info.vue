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
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      class="h-5 w-5 text-white/70 m-auto"
    >
      <path
        fill="currentColor"
        d="M10 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-6.535 6.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1c.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
      />
    </svg>
  </div>
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
