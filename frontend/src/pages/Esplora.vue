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
    <div class="create" v-if="user" :user="user">
      <button class="add btn btn-outline-success" @click="openCreateNoteForm"><img id="create" src="/plus.svg" alt=""></button>
    </div>
  </div>
  <!------------------------------------------------------------------------------------------------------------------------------------------->
  <div class="background">
    <div class="content">
      <PostNotes v-for="(nota, index) in datiNote" :nota="nota" :key="index" :identita="index + 1"  @viewNote="getNoteById(index)"/>
    </div>
  </div>
  <!------------------------------------------------------------------------------------------------------------------------------------------->
  <div class="contenitore">
    <div id="light" class="white_content" v-if="isCreateNoteFormVisible">
      <div class="title">
        <h2>
          <input v-model="newNote.title" placeholder="Titolo" />
          <div class="svgicon">
            <img id="document" src="/paper-document-svgrepo-com.svg" alt="" />
          </div>
        </h2>
      </div>
      <div class="secondary_info">
        <input v-model="newNote.category" placeholder="Categoria" /><br />
        <!--<input v-model="newNote.author" placeholder="Autore" /><br /> 
        <input type="date" v-model="newNote.date" placeholder="Data" /><br /> -->
      </div>
      <hr />
      <textarea v-model="newNote.text" placeholder="Testo"></textarea>
      <button class="create bg-success" @click="createNote">Crea nota</button>
      <a id="close" class="bg-danger" @click="closeCreateNoteForm">Chiudi</a>
    </div>
  </div>
  <div id="fade" class="black_overlay" v-if="isCreateNoteFormVisible"></div>
</template>
<!------------------------------------------------------------------------------------------------------------------------------------------->

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Nota } from "../types";
import { User } from "../types";
import PostNotes from "../components/posts-notes.vue";

export default defineComponent({
  components: { PostNotes },
  data() {
    return {
      datiNote: [] as Nota[],
      idnote: [] as Nota[],
      selectedCategory: '', // Imposta la categoria predefinita
      categories: [] as String[],
      selectedNoteID: null as number | null,
      user: null as User | null,
      isCreateNoteFormVisible: false,
      newNote: {
        title: '',
        category: '',
        //author: '',
        date: '',
        text: '',
        preview: '',
      },
    };
  },
  methods: {
    
    async createNote() {
      const res = await axios.post("/api/createPost", {
        title: this.newNote.title,
        category: this.newNote.category,
        //author: this.newNote.author, va tolto come l'input
        date: this.newNote.date,
        text: this.newNote.text,
        preview: this.newNote.text,
      });

      this.datiNote.push(res.data);
      this.closeCreateNoteForm();
    },

    openCreateNoteForm() {
      this.isCreateNoteFormVisible = true;
    },

    closeCreateNoteForm() {
      this.isCreateNoteFormVisible = false;
      window.location.reload();
    },

    async getNote() {
      const res = await axios.get("/api/note");
      this.datiNote = res.data;
    },

    async getNotebyCategory() {
      const res = await axios.get(`/api/note/${this.selectedCategory}`);
      this.datiNote = res.data;
    },

    async getNoteById(id: number) {
      try {
        const res = await axios.get(`/api/noteid/${id}`);
        const nota = res.data; // Supponendo che la risposta contenga direttamente i dati della nota
        console.log('Nota ottenuta con successo:', nota);
        // Fai qualcosa con la nota ottenuta, ad esempio aggiornare una variabile di stato o visualizzarla nell'applicazione
      } catch (error) {
        console.error('Errore durante la richiesta della nota:', error);
        // Gestisci eventuali errori, ad esempio mostrando un messaggio all'utente
      }
    },

    async getCategories() {
      const res = await axios.get("/api/categories");
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

    async getUser() {
      const res = await axios.get("/api/auth/profile");
      this.user = res.data;
    },

  },
  emits: ['viewNote'],
  watch: {
    selectedCategory() {
      this.getNotebyCategory();
    },
  },
  mounted() {
    this.getCategories();
    this.getNote();
    this.getNotebyCategory();
    this.getUser();
  },
});
</script>

<style scoped>

@media screen and (min-width: 768px) {
  .white_content {
    display: block;
    position: absolute;
    width: fit-content;
    overflow: visible;
    top: 18%;
    left: 20%;
    width: 60%;
    height: 65%;
    padding: 16px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
    color: #183252;
    z-index: 1003;
  }
}

/*------------------------------------------------------------------- */

.svgicon {
  text-align: end;
  margin-right: 10px;
}

a#close {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0.8em 1em;
  display: flex;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

.secondary_info {
  text-align: end;
  font-weight: bold;
  margin-right: 10px;
}

.black_overlay {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.815);
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

button.create {
  position: absolute;
  bottom: 10px;
  right: 90px;
  padding: 0.8em 1em;
  display: flex;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  background-color: #356cb1;
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover,
a#close:hover {
  animation: sh0 0.5s ease-in-out both;
}

@keyframes sh0 {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(7deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-7deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

button:hover,
a#close:hover span {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

button::before,
a#close:before button::after,
a#close:after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.15s cubic-bezier(0.02, 0.01, 0.47, 1);
  z-index: -1;
  transform: translate(100%, -25%) translate3d(0, 0, 0);
}

button:hover::before,
a#close:hover::before button:hover::after,
a#close:hover::after {
  opacity: 0.15;
  transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover::before,
a#close:hover::before {
  transform: translate3d(50%, 0, 0) scale(0.9);
}

button:hover::after,
a#close:hover::after {
  transform: translate(50%, 0) scale(1.1);
}

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

input {
  border: 1px solid rgb(211, 208, 208);
  border-radius: 10px;
  padding: 8px;
  margin-top: 5px;
}

textarea {
  border: 1px solid rgb(211, 208, 208);
  border-radius: 10px;
  padding: 8px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  resize:none;
  width: 100%;
  height: 40%;
  font-size: 18px;
}

/*------------------------------------------------------------------- */

select {
  border: 1px solid white;
  border-radius: 10px;
  background: transparent;
  color: white;
  width: fit-content;
  padding: 0.3em;
  cursor: pointer;
  height: 50px;
  /* margin-left: 10px; */
}

img#document{
  width: 50px;
  margin: 0px;
}

img#create {
  width: 35px;
  margin: 0px;
}

button.add {
  border-radius: 10px;
  margin-left: 1em;
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
  overflow: scroll;
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
