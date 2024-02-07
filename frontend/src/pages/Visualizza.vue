<template>
    <div class="note-details">
      <h1>{{ nota.titolo }}</h1>
      <p>Categoria: {{ nota.categoria }}</p>
      <p>Autore: {{ nota.autore }}</p>
      <p>Data: {{ nota.data }}</p>
      <hr>
      <p>{{ nota.testo }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { Nota } from "../types";
  
  export default defineComponent({
    data() {
      return {
        nota: {} as Nota // Inizializza nota come un oggetto vuoto di tipo Nota
      };
    },
    async created() {
      // Recupera l'id della nota dalla rotta
      const notaId = this.$route.params.id;
  
      try {
        // Effettua una richiesta HTTP per ottenere le informazioni della nota dal backend
        const response = await axios.get<Nota>(`/api/noteid/${notaId}`);
        this.nota = response.data;
      } catch (error) {
        console.error("Errore durante il recupero delle informazioni della nota:", error);
      }
    }
  });
  </script>
  
  <style scoped>
  </style>
  