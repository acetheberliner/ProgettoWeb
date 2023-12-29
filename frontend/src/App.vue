<template>
  <div class="full-page">
    <nav class="container">
      <div class="left-section">
        <img src="../public/vite.svg" class="header-logo" alt="">
        <router-link class="nav-link" to="/">Home</router-link>
      </div>
      <div class="right-buttons">
        <router-link class="nav-link" to="/explore">Esplora</router-link>
        <router-link class="nav-link" to="/login">Login</router-link>
        <router-link class="nav-link" to="/register">Register</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

*{
  font-family: 'Montserrat', sans-serif;
}

body, html {
  margin: 0px;
  padding: 0;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
}

.full-page{
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

main {
  padding: 40px; /* Aggiungi spazio sopra il contenuto per non sovrapporre la nav-bar */
  color: #fff; /* Cambia il colore del testo per contrastare con l'immagine di sfondo */
  font-family: Arial, sans-serif;
  background-image: url('link_all_immagine_di_sfondo.jpg');
  background-size: cover;
  background-position: center;
}

.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: #024454;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-logo {
  margin-right: 10px; /* Adjust spacing between the logo and text as needed */
}

.left-section {
  display: flex;
  align-items: center;
}

.right-buttons {
  display: flex;
}

nav .nav-link {
  margin-right: 10px;
  text-decoration: none;
  color: #fff; /* Colore del testo */
  padding: 8px 12px; /* Spaziatura interna */
  border-radius: 5px; /* Bordo arrotondato */
  background-color: #2e7d32; /* Colore di sfondo del link */
  transition: background-color 0.3s ease; /* Effetto di transizione sul cambio di colore */
}

nav .nav-link:hover {
  background-color: #1b5e20; /* Colore di sfondo quando il link è in hover */
}

main {
  flex: 1;
  padding: 0px;
}
</style>
