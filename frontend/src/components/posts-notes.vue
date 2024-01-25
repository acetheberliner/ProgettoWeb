<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Nota } from "../types";
import axios from "axios";

export default defineComponent({
  props: {
    nota: {
      type: Object as () => Nota,
      required: true,
    },
    identita: {
      type: [Number, String] as PropType<number>,
      required: true,
    },    
  },
  data() {
    return {
      notes: null as Nota | null,
      vocab: [] as Nota[],
      noteid: 0 as Number,
    };
  },
  methods: {
    async deleteNote() {
      if (confirm("Sei sicuro di voler eliminare questa nota?")) {
        try {
          const response = await axios.delete(`/api/deletePost/${this.nota?.id}`);
          // Gestisci la risposta come preferisci, ad esempio aggiornando la lista delle note
          console.log("Nota eliminata con successo:", response.data);
          this.$emit("delete")
          this.closeNote();
        } catch (error) {
          console.error("Errore durante l'eliminazione della nota:", error);
        }
      }
    },

    async visualizzaNota(id: number) {
      const response = await axios.get(`/api/noteid/${id}`);
      this.notes = response.data;
    },

    async getNote() {
      const res = await axios.get("/api/note");
      this.vocab = res.data;
    },

    closeNote(){
      document.getElementById('light')!.style.display = 'none';
      document.getElementById('fade')!.style.display = 'none';
      window.location.reload();
    },

    openNote(){
      document.getElementById('light')!.style.display = 'block';
      document.getElementById('fade')!.style.display = 'block';
    }
  },

  mounted() {
    this.getNote();
  }
});
</script>

<template>
  <div class="note"> 
    <section>
      <h3>{{ nota?.titolo }}</h3>
      <p class="categoria">{{ nota?.categoria }}</p>
      <p class="autore">{{ nota?.autore }}</p>
      <hr />
      <p class="anteprima">{{ nota?.anteprima }}</p>
    </section>
    <div>
      <button class="open" @click="visualizzaNota(+noteid); openNote()" id="open">Visualizza</button>
    </div>
  </div>
  <div id="light" class="white_content" v-if="notes">
    <div class="title">
      <h2>
        {{ nota.titolo }}
        <div class="svgicon">
          <img src="/paper-document-svgrepo-com.svg" alt="" />
        </div>
      </h2>
    </div>
    <div class="secondary_info">
      {{ nota.categoria }}<br />
      {{ nota.autore }}<br />
      {{ nota.data }}
    </div>
    <hr />
    <p id="inner_note">{{ nota.testo }}</p>
    <a id="close" @click="closeNote">Chiudi</a>
    <button class="delete btn bg-danger " @click="deleteNote">Elimina</button>
  </div>
  <div id="fade" class="black_overlay"></div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Quicksand&display=swap");

@media screen and (max-width: 1589px) {
  .white_content {
    display: none;
    position: absolute;
    top: 8.5em;
    bottom: 3em;
    right: 1em;
    left: 1em;
    padding: 16px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
    color: #183252;
    z-index: 1002;
    font-size: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 80%;
  }
}

@media screen and (min-width: 1590px) {
    .white_content {
    display: none;
    position: absolute;
    /* top: 18%;
    left: 20%;
    width: 60%;
    height: 65%; */
    margin-right: 20em;
    margin-left: 20em;
    padding: 16px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
    color: #183252;
    z-index: 1002;
    overflow: auto;
}

}

/*- ANTEPRIMA -------------------------------------------------------------------------------------------------------------------*/
.svgicon {
  text-align: end;
  margin-right: -12px;
}

img {
  width: 50px;
  margin-right: 15px;
}

#light,
#fade {
  display: none;
}

a#open {
  color: white;
  text-decoration: none;
}

p#inner_note {
  color: #183252;
}

a#close {
  color: #183252;
  text-decoration: none;
  width: fit-content;
  padding: 0.8em 1em;
  display: flex;
  bottom: 10px;
  right: 10px;
  margin-top: 10px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
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

button.delete {
  bottom: 10px;
  width: fit-content;
  padding: 0.8em 1em;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  /* background-color: #356cb1; */
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
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
  display: none;
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

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-transform: none;
  text-align: start;
  margin-bottom: 0px;
  margin-left: 10px;
  color: #235971;
  filter: drop-shadow(normal);
}

/*- BUTTON -------------------------------------------------------------------------------------------------------------------*/
button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0.8em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
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

/*----------------------------------------------------------------------------------------------------------------------------*/

.note {
  position: relative;
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #e6e6e6);
  box-shadow: 5px -5px 10px #f0f0f038, -5px 5px 10px #ffffff1c;
  padding: 10px;
  margin: 10px;
  color: #235971;
  text-align: center;
}

@font-face {
  font-family: clipFont;
  src: url("/fonts/colieplay.regular.ttf");
}

h3 {
  font-family: "Quicksand", sans-serif;
  font-size: 28px;
  font-weight: bold;
  text-align: start;
  margin-left: 10px;
  margin-top: 2px;
}

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-transform: none;
  text-align: start;
  margin-bottom: 0px;
  margin-left: 10px;
  color: #235971;
  filter: drop-shadow(normal);
}

p.categoria,
p.autore {
  font-weight: bold;
  text-align: end;
  margin-right: 10px;
}

p.anteprima {
  margin-bottom: 20px;
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
