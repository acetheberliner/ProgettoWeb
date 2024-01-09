<template>
  <div class="pre">
    <div class="title">
      <h2>Appunti di studenti</h2>
    </div>
    <div class="intro">
      <p class="slogan">Esplora un ricco assortimento di appunti per ogni materia, arricchisci la tua cultura ed espandi i limiti della tua conoscenza in un solo click!</p>
    </div>
    <div class="filter selectdiv">
      <form id="radio" action="#">
        <select name="Categoria" v-model="selectedCategory" @change="onChangeCategory">
          <option id="tutti" value="">Tutti</option>
          <option v-for="categoria in categories" :value="categoria">{{ categoria }}</option>
        </select>
      </form>
    </div>
  </div>
  <div class="background">
    <div class="content">
      <!-- <PostNotes
        v-for="nota in datiNote"
        :nota="nota"
        :key="nota.id"
        v-model="selectedNoteID"
      /> -->
      <PostNotes v-for="nota in datiNote" :nota="nota"/><!-- v-model="selectedId" @change="getNotebyID -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Nota } from "../types";
import PostNotes from "../components/posts-notes.vue";
// import PreviewNotes from "../components/preview-note.vue";

export default defineComponent({
  components: { PostNotes },
  data() {
    return {
      datiNote: [] as Nota[],
      selectedCategory: '', // Imposta la categoria predefinita
      categories: [] as String[],
      selectedNoteID: null as number | null,
    };
  },
  methods: {
    async getNote() {
      const res = await axios.get("/api/note");
      this.datiNote = res.data;
    },

    async getNotebyCategory() {
      const res = await axios.get(`/api/note/${this.selectedCategory}`);
      this.datiNote = res.data;
    },

    async getNotebyID() {
      const res = await axios.get(`/api/noteid/${this.selectedNoteID}`);
      this.datiNote = res.data;
    },

    async getCategories() {
      const res = await axios.get("/api/categories"); // Sostituisci con l'endpoint corretto
      this.categories = res.data.map((categoria: { categoria: any; }) => categoria.categoria); // Supponendo che le categorie siano restituite come un array di stringhe
    },

    async setCategoryDefalut() {
      this.selectedCategory='';
    },

    resetCategoryFilter(): void {
      this.selectedCategory = ''; // Imposta la variabile selectedCategory a una stringa vuota
      this.getNote(); // Chiama la funzione per ottenere tutte le note senza filtro
    },

    onChangeCategory(): void {
      if (this.selectedCategory === '') {
        this.resetCategoryFilter(); // Se viene selezionato "Tutti", resetta il filtro
      } else {
        this.getNotebyCategory(); // Altrimenti, applica il filtro selezionato
      }
    },

  },
  watch: {
    selectedCategory() {
      this.getNotebyCategory();
    },
    // selectedId() {
    //   this.getNotebyID();
    // },
  },
  mounted() {
    this.getCategories();
    this.getNote();
    this.getNotebyCategory();
    // this.getNotebyID();
  },
});
</script>

<style scoped>

select {
  border: 1px solid white;
  border-radius: 10px;
  background: transparent;
  color: white;
  width: fit-content;
  padding: 0.3em;
  cursor: pointer;
  margin-left: 10px;
}

.selectdiv select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: fit-content;
  float: left;
  padding: 8px;
  line-height: 1.75;
  border: 1px solid #cccccc;
}

option {
  color: #0c29ac;
  background: transparent;
  text-align: start;
}

option#tutti{
  text-align: center;
}

#popup-window {
  position: fixed;
  width: 300px;
  height: 200px;
  background: white;
  border: 1px solid black;
  padding: 10px;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
}
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
  margin-top: 15px;
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
