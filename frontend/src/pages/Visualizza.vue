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
        <button class="btn btn-danger" v-if="checkUserPermission()" @click="nota && deleteNote(nota.idnote)">Elimina</button>
        <button class="btn btn-primary" v-if="checkUserPermission()" @click="editNote()">Modifica</button>
        <button class="btn btn-warning" @click="closeNote()">Chiudi</button>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { PropType, defineComponent } from "vue";
  import axios from "axios";
  import { Nota } from "../types";
  import { User } from "../types";
  
  export default defineComponent({
    props: {
      user: Object as PropType<User>,
    },
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
      },

      async closeNote() {
        window.location.href = "/explore";
      },

      async deleteNote(id: number) {
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

      async editNote() {
        try {
          const response = await axios.post("/api/editPost", this.nota);
          console.log("Nota modificata con successo:", response.data);
          // Puoi gestire la risposta come preferisci
        } catch (error) {
          console.error("Errore durante la modifica della nota:", error);
        }
      },

      checkUserPermission() {
        return this.user && (this.user.role === 'mod' || this.user.username === this.nota?.autore);
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
  width: 90%;
  height: fit-content;
  padding: 2em;
  position: relative; /* Aggiunta */
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

.testo {
  margin-bottom: 5%;
}

.button-area {
  position: absolute; /* Aggiunta */
  bottom: 0; /* Aggiunta */
  right: 0; /* Aggiunta */
  margin: 20px;
}

button {
  margin-right: 8px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
  