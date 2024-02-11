<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Nota } from "../types";
import { User } from "../types";
import PostNotes from "../components/posts-notes.vue";

export default defineComponent({
  components: { PostNotes },
  props: {
    nota: {
      type: Object as () => Nota,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      datiNote: [] as Nota[],
      notePerState: [] as Nota[],
      user: null as User | null,
      categories: [] as String[],
      selectedCategory: '',
      newNote: {
        title: '',
        category: '',
        text: ''
      }
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

    async getCategories() {
      const res = await axios.get("/api/categories");
      this.categories = res.data.map((categoria: { categoria: any; }) => categoria.categoria); // Supponendo che le categorie siano restituite come un array di stringhe
    },

    async getUser() {
      const res = await axios.get("/api/auth/profile");
      this.user = res.data;
    },

    async fetchNotesState() {
      try {
        const response = await axios.get(`/api/state/${this.nota?.stato}`);
        this.notePerState = response.data;
      } catch (error) {
        console.error("Errore durante il recupero delle note per stato", error);
      }
    },

    async visualizzaNota(idnote: number) {
      this.$router.push({ 
        path: `/view/${idnote}`
      });
    }
  },
  watch: {
    selectedCategory() {
      this.getNotebyCategory();
    },
  },
  mounted() {
    this.getNote();
    this.getUser();
    this.getCategories();
    this.getNotebyCategory();
    this.fetchNotesState();
  },
});
</script>
<!------------------------------------------------------------------------------------------------------------------------------------------->

<template>
  <div class="pre">
    <div class="title">
      <h2>Appunti di studenti</h2>
    </div>
    <div class="intro">
      <p class="slogan">Esplora un ricco assortimento di appunti per ogni materia, arricchisci la tua cultura ed espandi i limiti della tua conoscenza in un solo click!</p>
    </div>
    <!------------------------------------------------------------------------------------------------------------------------------------------->
    <div class="filter selectdiv">
      <form id="radio" action="#">
        <select name="Categoria" v-model="selectedCategory">
          <option id="tutti" value="">Tutti</option>
          <option v-for="categoria in categories" :value="categoria">{{ categoria }}</option>
        </select>
      </form>
    </div>
  </div>
  <!------------------------------------------------------------------------------------------------------------------------------------------->
  <div v-if="user?.role == 'mod'" class="container">
    <h3>Approva</h3>
    <div class="approva">
      <div class="note-approvation container">
        <div v-for="nota in datiNote">
          <a class="note-button" @click="visualizzaNota(nota.idnote)">
            <div class="bubble" v-if="nota.stato != 'approvata'">
              <p class="note-title "><img id="document" src="/paper-document-svgrepo-com.svg" alt="" />{{ nota.titolo }}</p>
              <!----------------------------------------------------------------------------------------------------------------->
              <p v-if="nota.stato == 'da approvare'" class="stato bg-warning text-dark">{{ nota.stato }}</p>
              <p v-if="nota.stato == 'rifiutata'" class="stato bg-danger text-white">{{ nota.stato }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="background">
    <div class="content">
      <PostNotes v-for="(nota, index) in datiNote" :nota="nota" :key="index" class="postnotes"/>
    </div>
  </div>
</template>
<!------------------------------------------------------------------------------------------------------------------------------------------->

<style scoped>
div.bubble {
  border: 1px solid white;
  border-radius: 10px;
  margin-right: 10px;
  padding: 0.6em;
  background-color: #fff;
  width: 11em;
  height: 5.2em;
  transition: all 0.1s ease-in-out;
}

div.bubble:hover {
  transform: scale(1.06);
}

.note-button {
  border: none;
}

p.note-title {
  margin: 0px;
  color: #235971;
  font-weight: bold;
}

img#document{
  width: 35px;
  margin-right: 5px;
}

p.stato {
  text-transform: uppercase;
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  font-size: 13px;
  margin: auto;
  font-weight: bold;
  box-shadow: rgb(29, 44, 59) 0px 10px 20px -10px;
}

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

select {
  border: 1px solid white;
  border-radius: 10px;
  background: transparent;
  color: white;
  width: fit-content;
  padding: 0.3em;
  cursor: pointer;
  height: 50px;
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
/*- SCROLLBAR -----------------------------------------------------------------------------------------------------------------------------------*/

.content {
  --sb-thumb-color: #ffffff;
  --sb-track-color: #2568bf00;
  --sb-size: 5px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  overflow-y: scroll;
  cursor: pointer;
}

.content::-webkit-scrollbar {
  width: var(--sb-size);
}

.approva::-webkit-scrollbar {
  height: var(--sb-size2);
}

.content::-webkit-scrollbar-track, .approva::-webkit-scrollbar-track{
  background: var(--sb-track-color);
  border-radius: 12px;
}

.content::-webkit-scrollbar-thumb, .approva::-webkit-scrollbar-thumb{
  background: var(--sb-thumb-color);
  border-radius: 12px;
}

/*-NOTE----------------------------------------------------------------------------------------------------------------------------------------------*/
.content {
  overflow: auto;
  padding: 20px;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto; /*  <-------------------DOPO AVER PULITO App.vue RICONTROLLARE-----------------------  */
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

hr {
  border: none;
  height: 3px;
  background-color: #fff;
  margin: 10px 0;
  justify-content: center;
}

.approva {
  padding: 0.9em;
  width: 100%;
  color: #fff;
  margin-top: 0px;
  margin-bottom: 10px;
  --sb-thumb-color: #ffffff;
  --sb-track-color: #2568bf00;
  --sb-size2: 4px;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  overflow-x: auto;
  cursor: pointer;
} 

.note-approvation {
  display: flex;
  flex-direction: row;
}

h3{
  font-weight: bold;
  text-align: center;
}

.postnotes {
  transition: all 0.2s ease-in-out;
}

.postnotes:hover {
  transform: scale(1.04);
}
</style>
