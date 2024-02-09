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
  <div class="background">
    <div class="content">
      <PostNotes v-for="(nota, index) in datiNote" :nota="nota" :key="index" class="postnotes"/>
    </div>
  </div>
  <div v-if="user?.role == 'mod'" class="container">
    <div class="approva">
      <h3>Approva</h3>
    </div>
  </div>
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
  props: {
    // nota: {
    //   type: Object as () => Nota,
    //   required: true,
    // }  
  },
  data() {
    return {
      datiNote: [] as Nota[],
      user: null as User | null,
      categories: [] as String[],
      selectedCategory: '', // Imposta la categoria predefinita
      newNote: {
        title: '',
        category: '',
        date: '',
        text: '',
        preview: '',
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

  },
  emits: ['viewNote'],
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

hr {
  border: none;
  height: 3px;
  background-color: #fff;
  margin: 10px 0;
  justify-content: center;
}

.approva {
  border: 1px solid white;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  background-color: white;
  color: #183252;
  box-shadow: 5px -5px 10px #f0f0f038, -5px 5px 10px #ffffff1c;
  margin-top: 20px;
  margin-bottom: 20px;
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
