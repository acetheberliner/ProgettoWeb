<script lang="ts">
import {PropType, defineComponent } from "vue";
import { Nota, User } from "../types";

export default defineComponent({
  props: {
    nota: {
      type: Object as () => Nota,
      required: true,
      default: () => ({})
    },
    user: Object as PropType<User>,
  },
});
</script>

<template>
    <div class="note">
        <h3 class="note-title">{{ nota.titolo }}</h3>
    </div>
</template>

<style scoped>
.note{
    border: 1px solid white;
    border-radius: 10px;
}

h3.note-title {
    font-weight: bold;
}
</style>