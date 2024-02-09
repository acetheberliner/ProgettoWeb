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
        textInput: '',
        newNote: {
            idnote: 0,
            title: '',
            category: '',
            text: '',
        },
      };
    },
    methods: {
      async getNote() {
        const notaId = this.$route.params.id;
        try {
          const response = await axios.get(`/api/noteid/${notaId}`);
          this.nota = response.data[0];
          console.log(this.nota);
        } catch(error) {
          console.error("Errore durante il recupero delle informazioni della nota:", error);
        }
        if(this.nota) {
          this.newNote.idnote = this.nota.idnote;
          this.newNote.title = this.nota.titolo;
          this.newNote.category = this.nota.categoria;
          this.newNote.text = this.nota.testo;
        }
        
      },

      async editNote() {
        try {
          await axios.post("/api/editPost", {
            idnote: this.newNote.idnote,
            title: this.newNote.title,
            category: this.newNote.category,
            text: this.newNote.text,
          });
        } catch(e) {
          console.error('Errore', e)
        }
        alert("Nota modificata con successo!");
        window.location.href = "/";
      },

      async closeNote() {
        window.location.href = "/explore";
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
        <div class="title">
          <h2>
            <input v-model="newNote.title" placeholder="Titolo" required/>
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
        <button class="create bg-success" @click="editNote()">Modifica</button>
        <a id="close" class="btn btn-danger" @click="closeNote()">Chiudi</a>
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

img#document{
  width: 50px;
  margin: 0px;
}

.secondary_info {
  text-align: end;
  font-weight: bold;
  margin-right: 10px;
}

.create{
  border: 1px solid white;
  border-radius: 10px;
  padding: 0.6em;
  box-shadow: rgb(29, 44, 59) 0px 10px 20px -10px;
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
  font-size: 13px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
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
  font-weight: 300;
  font-size: 13px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

</style>