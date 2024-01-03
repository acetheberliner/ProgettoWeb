<template>
  <div class="background">
    <div class="title">
      <h2>Note di Studenti</h2>
    </div>
    <div class="content">
      <PostNotes v-for="nota in datiNote" :nota="nota" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Nota } from "../types";
import PostNotes from "../components/posts-notes.vue";

export default defineComponent({
  components: { PostNotes },
  data() {
    return {
      datiNote: [] as Nota[],
    };
  },
  methods: {
    getNote() {
      axios
        .get("/api/note")
        .then((response) => (this.datiNote = response.data));
    },
  },
  mounted() {
    this.getNote();
  },
});
</script>

<style scoped>
.content {
  /* flex-grow: 1; Per far crescere questo div per occupare lo spazio rimanente */
  overflow-y: auto; /* Abilita lo scrolling verticale quando il contenuto supera l'altezza massima */
  padding: 20px; /* Aggiunge spazio interno per evitare che il contenuto sia troppo vicino ai bordi */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .content {
    grid-template-columns: repeat(1, 1fr);
  }
}

.background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  height: 100%; /* Imposta l'altezza per rendere visibile il contenuto */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: inline-grid;
}
</style>
