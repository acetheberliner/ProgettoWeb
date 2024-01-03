<template>
  <div class="full-page">
    <main>
      <nav class="container">
        <div class="header-logo">
          <p>Note<span>Sync</span></p>
        </div>
        <router-link class="nav-link button glow-button btn1" to="/"
          >Home</router-link
        >
        <router-link class="nav-link button glow-button btn2" to="/explore"
          >Esplora</router-link
        >
        <router-link class="nav-link button glow-button btn3" to="/login"
          >Login</router-link
        >
        <router-link class="nav-link button glow-button btn4" to="/register"
          >Registrati</router-link
        >
      </nav>
      <router-view />
    </main>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

* {
  font-family: "Montserrat", sans-serif;
}

body,
html {
  margin: 0px;
  padding: 0;
  height: 100%;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
}

.full-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

p {
  margin: 0px;
  font-weight: bold;
  font-style: italic;
  color: rgb(209, 233, 236);
  font-size: 45px;
  text-transform: uppercase;
  font-family: myFirstFont;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}

span {
  color: #169df7;
  font-style: italic;
  background: linear-gradient(to right, #0af3e0 0%, #0985eb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

@font-face {
  font-family: myFirstFont;
  src: url("../public/junegull.otf");
}

main {
  padding: 40px; /* Aggiungi spazio sopra il contenuto per non sovrapporre la nav-bar */
  color: #fff; /* Cambia il colore del testo per contrastare con l'immagine di sfondo */
  background-image: url("../../public/Cloudy.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%; /* Imposta l'altezza per rendere visibile il contenuto */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;
}

.container {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  min-width: 100%;
  box-sizing: border-box;
  background: transparent;
  /* background-color: #024454;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);*/
}

.header-logo {
  margin-right: 10px; /* Adjust spacing between the logo and text as needed */
  margin: 30px;
}

nav .nav-link {
  margin-left: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: #fff; /* Colore del testo */
  font-size: 20px;
  font-weight: bold;
  padding: 8px 12px; /* Spaziatura interna */
  border-radius: 5px; /* Bordo arrotondato */
  transition: background-color 0.3s ease; /* Effetto di transizione sul cambio di colore */
}

/* nav .nav-link:hover {
  background-color: #1b5e20; /* Colore di sfondo quando il link è in hover
} */

.button {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 15px 40px;
  border-radius: 4px;
  font-weight: normal;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
}

.btn1:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #c6d8ff;
}

.btn2:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #1265da;
}

.btn3:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #6b5ca5;
}

.btn4:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 15px #ee42c0;
}

main {
  flex: 1;
  padding: 0px;
}
</style>
