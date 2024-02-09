<script lang="ts">
import {defineComponent } from "vue";
import { Nota } from "../types";
import axios from "axios";

export default defineComponent({
  props: {
    nota: {
      type: Object as () => Nota,
      required: true,
      default: () => ({})
    }  
  },
  data() {
    return {
      notes: null as Nota | null,
      vocab: [] as Nota[],
      noteid: 0 as Number,
    };
  },
  methods: {
    async deleteNote(id: Number) {
      console.log("ID della nota:", id);
      if (confirm("Sei sicuro di voler eliminare questa nota?")) {
        try {
          const response = await axios.delete(`/api/deletePost/${id}`);
          // Gestisci la risposta come preferisci, ad esempio aggiornando la lista delle note
          console.log("Nota eliminata con successo:", response.data);
          // this.$emit("delete")
          this.closeNote();
        } catch (error) {
          console.error("Errore durante l'eliminazione della nota:", error);
        }
      }
    },

    async visualizzaNota() {
      this.$router.push({ 
        path: `/view/${this.nota.idnote}`,
        query: { 
          titolo: this.nota.titolo,
          categoria: this.nota.categoria,
          autore: this.nota.autore,
          data: this.nota.data,
          testo: this.nota.testo,
          stato: this.nota.stato
        }
      });
    },

    openNote(){
      document.getElementById('light')!.style.display = 'block';
      document.getElementById('fade')!.style.display = 'block';
    },

    closeNote(){
      document.getElementById('light')!.style.display = 'none';
      document.getElementById('fade')!.style.display = 'none';
      window.location.reload();
    }
  },
});
</script>

<template>
  <div class="note"> 
    <section>
      <h3>{{ nota.titolo }}</h3>
      <p class="categoria">{{ nota.categoria }}</p>
      <p class="autore">{{ nota.autore }}</p>
      <hr />
      <p v-if="nota.stato == 'approvata'" class="stato bg-success">{{ nota.stato }}</p>
      <p v-if="nota.stato == 'da approvare'" class="stato bg-warning text-dark">{{ nota.stato }}</p>
      <p v-if="nota.stato == 'rifiutata'" class="stato bg-danger">{{ nota.stato }}</p>
    </section>
    <div class="open">
      <button @click="visualizzaNota()" id="open">Visualizza</button>
    </div>
  </div>
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

.open{
  margin-top: 50px;
}

img {
  width: 50px;
  margin-right: 15px;
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

p.stato {
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
  width: fit-content;
  padding: 0.4em;
  border-radius: 12px;
  font-size: 13px;
  color: #fff;
  cursor: default;
}
/*--------------------------------------------------------------------------------------------------------------------*/
</style>
