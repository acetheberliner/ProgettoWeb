<template>
    <div class="error-page">
      <h1>Errore 404</h1>
      <p>La pagina che stai cercando non è disponibile.</p>
      <router-link to="/">Torna alla pagina principale</router-link>
    </div>
  </template>
  
  <style scoped>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 4em;
    color: #333;
  }
  
  p {
    font-size: 1.2em;
    color: #555;
    margin-bottom: 20px;
  }
  
  router-link {
    font-size: 1.2em;
    color: #007bff;
    text-decoration: none;
  }
  </style>