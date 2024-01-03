<template>
    <div>
      <label for="testoInput" class="label">Inserisci il testo:</label>
      <input type="text" id="testoInput" v-model="textInput" class="input" />
  
      <button @click="pubblica" class="pulsante">Pubblica</button>
    </div>
  </template>
  
<script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue'

  export default defineComponent({
    data() {
      return {
        textInput: '',
      };
    },
    methods: {
      pubblica() {
        try {
            axios.post("/api/createPost", {
              textInput: this.textInput
            })
            window.location.href = "/myaccount"
        } catch(e) {
            console.error("Errore: ", e)
        }
      },
    },
  })
  </script>
  
  <style scoped>
.contenitore {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid green;
  border-radius: 8px;
}

.label {
  color: green;
  margin-bottom: 8px;
}

.input {
  border: 1px solid green;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.pulsante {
  background-color: green;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
  