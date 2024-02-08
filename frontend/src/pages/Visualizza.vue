<template>
  <div class="note">
    <div class="note-details">
      <h1 v-if="nota" class="titolo">{{ nota.titolo }}</h1>
      <div v-if="nota" class="secondary_info">
        {{ nota.categoria }}<br />
        {{ nota.autore }}<br />
        {{ nota.data }}
      </div>
      <hr>
      <p v-if="nota" class="testo">{{ nota.testo }}</p>
      <div class="button-area">
        <button class="btn btn-danger">Elimina</button>
        <button class="btn btn-primary">Modifica</button>
        <button class="btn btn-warning">Chiudi</button>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { Nota } from "../types";
  
  export default defineComponent({
    data() {
      return {
        nota: null as Nota | null // Inizializza nota come un oggetto vuoto di tipo Nota
      };
    },
    methods: {
      async created() {
        // Recupera l'id della nota e le altre proprietà dalla query della rotta
        const notaId = this.$route.params.id;
        
        try {
          const response = await axios.get(`/api/noteid/${notaId}`);
          this.nota = response.data[0];
          console.log(this.nota);
        } catch(error) {
          console.error("Errore durante il recupero delle informazioni della nota:", error);
        }
      }
    },
    mounted() {
      this.created()
    }
  });
  </script>
  
<style scoped>

.note {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.note-details {
  border: 1px solid white;
  border-radius: 10px;
  background-color: white;
  color: #183252;
  width: 80%;
  height: 80%;
  padding: 2em;
}

p {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  text-transform: none;
  text-align: start;
  margin-bottom: 0px;
  margin-left: 10px;
  color: #235971;
  filter: drop-shadow(normal);
}

.secondary_info {
  text-align: end;
  font-weight: bold;
  margin-right: 10px;
}

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

.button-area{
  position: absolute;
  bottom: 0;
  
}
</style>
  