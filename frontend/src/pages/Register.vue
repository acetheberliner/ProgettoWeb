<template>
    <h2>Registrazione</h2>
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
        </div>
        <div class="form-group">
            <button @click="onSubmit">Registrati</button>
        </div>
    </form>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
//import { useRouter } from 'vue-router'

export default defineComponent({
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      try {
        axios.post("/api/auth/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        // fare reinderizzamento con router.push o window.location
        
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    }
  }
})
</script>
  
<style scoped>
  h2 {
    text-align: center;
    color: #333;
  }
  
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2e7d32;
  }
</style>
  <!---->