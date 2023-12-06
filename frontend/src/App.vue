<template>
  <div>
    <nav>
      <router-link class="nav-link" to="/">Home</router-link>
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

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #4caf50; /* Colore di sfondo */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  padding: 20px;
}
</style>
