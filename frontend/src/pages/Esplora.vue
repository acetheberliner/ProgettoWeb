<template>
  <div class="pre">
    <div class="title">
      <h2>Appunti di studenti</h2>
    </div>
    <div class="intro">
      <p class="slogan">
        Esplora un ricco assortimento di appunti per ogni materia, arricchisci
        la tua cultura ed espandi i limiti della tua conoscenza in un solo
        click!
      </p>
    </div>
  </div>
  <div class="background">
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
/*- SCROLLBAR -----------------------------------------------------------------------------------------------------------------------------------*/

.content {
  --sb-thumb-color: #ffffff;
  --sb-track-color: #2568bf00;
  --sb-size: 4px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

.content::-webkit-scrollbar {
  width: var(--sb-size);
}

.content::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 12px;
}

.content::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 12px;
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

.content {
  /* flex-grow: 1; Per far crescere questo div per occupare lo spazio rimanente */
  overflow: auto; /* Abilita lo scrolling verticale quando il contenuto supera l'altezza massima */
  padding: 20px; /* Aggiunge spazio interno per evitare che il contenuto sia troppo vicino ai bordi */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

@media (max-width: 1400px) {
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
  overflow: auto;
}

.pre {
  margin-left: 2.2em;
}

h2 {
  color: #169df7;
  font-weight: bold;
  background: linear-gradient(to right, #0af3e0 0%, #038cfc 25%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.slogan {
  font-size: 18px;
}
</style>
