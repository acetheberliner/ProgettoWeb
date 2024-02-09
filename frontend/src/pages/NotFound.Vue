
import { RouterLink } from 'vue-router';
<template>
  <div class="error-page">
    <div class="container text-center">
      <h1>Errore <span class="err404">404</span></h1>
      <p>La pagina che stai cercando non è disponibile.</p>
      <RouterLink to="/" class="back btn btn-outline-light"><span>Torna alla Home</span></RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5vh;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: rgb(29, 44, 59) 0px 20px 30px -10px;
  width: fit-content;
}

.error-page {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@font-face {
  font-family: font404;
  src: url("/fonts/404.regular.ttf");
}

h1 {
  font-size: 6em;
  text-align: center;
  color: #ffffff;
  font-family: font404;
}

span.err404 {
  background: rgb(255,21,3);
  background: linear-gradient(90deg, rgba(255,21,3,1) 0%, rgba(243,255,0,1) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
}

p {
  font-size: 1.2em;
  color: #fafafa;
  margin-bottom: 20px;
}

.back {
  font-size: 1.2em;
  color: #042447;
  border: 1px solid #042447;
  text-align: center;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.back:hover {
  text-decoration: none;
  transform: scale(1.1);
}
</style>
