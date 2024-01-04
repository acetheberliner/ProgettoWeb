<template>
  <div class="error-page">
    <div class="container">
      <h1>Errore <span>404</span></h1>
      <p>La pagina che stai cercando non è disponibile.</p>
      <router-link to="/"
        ><span class="back">Torna alla pagina principale</span></router-link
      >
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.3);
  /* background:transparent;
    backdrop-filter:blur(20px); */
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

h1 {
  font-size: 6em;
  text-align: center;
  color: #ffffff;
  font-family: font404;
}

span {
  color: red;
  text-align: center;
}

p {
  font-size: 1.2em;
  color: #fafafa;
  margin-bottom: 20px;
}

@font-face {
  font-family: font404;
  src: url("/fonts/404.regular.ttf");
}

.back {
  font-size: 1.2em;
  color: #042447;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
}
</style>
