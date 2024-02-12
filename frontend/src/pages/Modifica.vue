<script lang="ts">
  import axios from 'axios';
  import { Nota } from "../types";
  import { User } from "../types";
  import { PropType, defineComponent } from 'vue';

  export default defineComponent({
    props: {
      user: Object as PropType<User>,
    },
    data() {
      return {
        nota: null as Nota | null,
        newNote: {
            idnote: 0,
            title: '',
            category: '',
            text: '',
            comment: ''
        },
      };
    },
    methods: {
      async getNote() {
        const notaId = this.$route.params.id;
        try {
          const response = await axios.get(`/api/noteid/${notaId}`);
          this.nota = response.data[0];
          // console.log(this.nota);
        } catch(error) {
          console.error("Errore durante il recupero delle informazioni della nota:", error);
        }
        if(this.nota) {
          this.newNote.idnote = this.nota.idnote;
          this.newNote.title = this.nota.titolo;
          this.newNote.category = this.nota.categoria;
          this.newNote.text = this.nota.testo;
          this.newNote.comment = this.nota.commento;
        }
      },

      async editNote() {
        alert("Nota modificata con successo!");
        window.location.href = "/explore";
        await axios.post("/api/editPost", {
          idnote: this.newNote.idnote,
          title: this.newNote.title,
          category: this.newNote.category,
          text: this.newNote.text,
        });
      },

      async closeNote() {
        window.location.href = "/explore";
      },

      async approvaNota() {
        alert("Nota approvata correttamente!");
        window.location.href = "/explore";
        await axios.post(`/api/updateState`, {
            idnote: this.newNote.idnote,
            comment: this.newNote.comment,
            state: 'approvata',
        });
      },

      async rifiutaNota() {
        alert("Nota rifiutata correttamente!");
        window.location.href = "/explore";
        await axios.post(`/api/updateState`, {
            idnote: this.newNote.idnote,
            comment: this.newNote.comment,
            state: 'rifiutata',
        });
      },

      checkUserPermission() {
        return this.user && (this.user.role === 'mod' || this.user.username === this.nota?.autore);
      },

      async deleteNote(id: number) {
        console.log("ID della nota:", id);
        if (confirm("Sei sicuro di voler eliminare questa nota?")) {
          try {
            const response = await axios.delete(`/api/deletePost/${id}`);
            console.log("Nota eliminata con successo:", response.data);
            this.closeNote();
          } catch (error) {
            console.error("Errore durante l'eliminazione della nota:", error);
          }
        }
      },
    },
    mounted() {
      this.getNote();
    }
  })
  </script>

<template>
  <h2 class="titolo">Modifica Nota</h2>
  <div class="page">
    <div class="contenitore">
      <div id="light" class="white_content">
        <div>
          <h2>
            <input class="title" v-model="newNote.title" placeholder="Titolo" required/>
            <div class="svgicon">
              <img id="document" src="/paper-document-svgrepo-com.svg" alt="" />
            </div>
          </h2>
        </div>
        <div class="secondary_info">
          <input v-model="newNote.category" placeholder="Categoria" required/><br />
        </div>
        <hr />
        <textarea v-model="newNote.text" placeholder="Scrivi qui..." required></textarea>
        <!--------------------------------------------------------------------------------------------------------->
        <button class="delete btn-danger" v-if="checkUserPermission()" @click="nota && deleteNote(nota.idnote)">Elimina</button>
        <button class="create bg-primary" @click="editNote()">Modifica</button>
        <a id="close" class="btn btn-warning text-dark" @click="closeNote()">Chiudi</a>
        <!--------------------------------------------------------------------------------------------------------->
        <div class="confirmation" v-if="user?.role == 'mod' && (nota?.stato == 'da approvare' || nota?.stato == 'rifiutata')">
          <div class="buttons">
            <button class="check" @click="approvaNota()"><img id="conf-button" src="/check.svg" title="Approva nota"></button>
            <button class="cross" @click="rifiutaNota()"><img id="conf-button" src="/cross.svg" title="Rifiuta nota"></button>
          </div>
          <!--------------------------------------------------------------------------------------------------------->
          <div class="comment" v-if="user?.role == 'mod' && (nota?.stato == 'da approvare' || nota?.stato == 'rifiutata')">
            <textarea v-model="newNote.comment" placeholder="Commento moderatore..." cols="40" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

.titolo {
  text-align: center;
  font-weight: bold;
  margin-bottom: 25px;
}


.contenitore {
  display: flex;
  justify-content: center;
  align-items: center;
}

.white_content {
  display: block;
  position: absolute;
  width: fit-content;
  overflow: visible;
  top: 22%;
  width: 60%;
  height: 65%;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
  color: #183252;
  z-index: 1003;
}

.svgicon {
  text-align: end;
  margin-right: 10px;
}

div.confirmation {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 35px;
  align-items: center;
}

div.buttons {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

img#document{
  width: 50px;
  margin: 0px;
}

img#conf-button{
  width: 50px;
  margin: 0px;
}

button.check, button.cross {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  margin-bottom: 10px;
  transition: all 0.1s ease-in-out;
}

button.check:hover, button.cross:hover {
  transform: scale(1.2);
} 

.secondary_info {
  text-align: end;
  font-weight: bold;
  margin-right: 10px;
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
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  box-shadow: rgb(29, 44, 59) 0px 10px 10px -10px;
  transition: all 0.1s ease-in-out;
}

button.delete {
  position: absolute;
  bottom: 10px;
  right: 192px;
  padding: 0.8em 1em;
  display: flex;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  background-color: #e92b12;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  box-shadow: rgb(29, 44, 59) 0px 10px 10px -10px;
  transition: all 0.1s ease-in-out;
}

button.create:hover, button.delete:hover {
  transform: scale(1.06);
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

input.title {
  width: 45%;
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

input::placeholder, textarea::placeholder {
    color: black;
    opacity: 0.6;
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
  font-weight: bold;
  font-size: 13px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  box-shadow: rgb(29, 44, 59) 0px 10px 10px -10px;
  transition: all 0.1s ease-in-out;
}

a#close:hover {
  transform: scale(1.06);
}

</style>