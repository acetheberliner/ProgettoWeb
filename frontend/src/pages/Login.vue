<template>
    <h2>Login</h2>
    <form>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
            <button type="submit">Accedi</button>
        </div>
    </form>
</template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
  };
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
  