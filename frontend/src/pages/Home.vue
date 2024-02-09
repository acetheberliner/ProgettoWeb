<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({});

</script>

<template>
  <div class="page">
    <div class="info">
      <div class="header1">
        <div class="title">
          <h1>NoteSync - <span>"Condividi ciò che sai"</span></h1>
        </div>  
        <div class="caption">
          <p>Benvenuto in un nuovo servizio di gestione appunti! La piattaforma offre un'esperienza senza complicazioni, arricchendo il tuo modo di organizzare e accedere alle tue note in modo efficiente. Ecco quali sono le funzionalità principali offerte:</p>
        </div>
      </div>
      <hr>
      <div class="content">
        <div class="bubble">
          <h3>Homepage</h3>  
          <p>Rappresenta il punto di accesso centrale alla piattaforma di gestione appunti. Qui, gli utenti possono registrarsi o effettuare il login per accedere alle funzionalità di creazione, modifica e organizzazione delle note stesse. </p>
        </div>
        <hr>
        <div class="bubble">
          <h3>Profilo</h3>
          <ul>
            <li>Registrazione/Accesso</li>
            <li>Assegnazione Cookie</li>
            <li><RouterLink to="/myaccount">Sezione profilo utente</RouterLink></li>
          </ul>
        </div>
        <hr>
        <div class="bubble">
          <h3>Appunti</h3>
          <p>Esplora una ricca collezione di appunti in modo ordinato e strutturato. Ogni nota è visualizzabile singolarmente e filtrabile in base alla categoria che più ti interessa e se vorrai potrai addirittura contribuire all'espansione della piattaforma creandone di nuove.</p>
          <p>Le funzionalità offerte sono:</p>
          <ul>
            <li>Creazione note</li>
            <li>Modifica note</li>
            <li>Cancellazione note</li>
            <li>filtro</li>
            <li>Visualizzazione ampia</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

* {
    font-family: 'Montserrat', sans-serif;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info {
  border: 1px solid white;
  border-radius: 12px;
  background-color: white;
  color: #183252;
  width: 80%;
  padding: 1em;
  margin-top: 20px;
}

h1 {
  font-weight: bold;
  text-transform: uppercase;
  cursor: default;
}

h1>span {
  font-size: 20px;
  font-style: italic;
  vertical-align: middle;
  font-weight: bold;
  background: linear-gradient(to right, #0af3e0 0%, #038cfc 25%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-transform:none;
}

h3 {
  font-weight: bold;
}

hr {
  border: none;
  height: 2px;
  background-color: #235971;
  margin: auto;
  width: 80%;
}

/* .page {
  display: flex;
  flex-direction: column;
  align-items: center;
} */

/* .header1 {
  width: 80%;
  border: 1px solid rgba(219, 216, 216, 0.562);
  border-radius: 10px;
  padding: 0.8em;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background:transparent;
  backdrop-filter:blur(20px);
}

h1 {
  font-style: italic;
  font-size: 50px;
  font-family: myFirstFont;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  margin: 0px;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}

h2 {
  font-size: 16px;
  font-style: italic;
}

.caption {
  margin-top: 25px;
  font-size: 16px;
}

.content {
  /* flex-grow: 1; Per far crescere questo div per occupare lo spazio rimanente
  overflow: auto; /* Abilita lo scrolling verticale quando il contenuto supera l'altezza massima
  padding: 20px; /* Aggiunge spazio interno per evitare che il contenuto sia troppo vicino ai bordi 
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 80%;
  gap: 15px;
  margin-top: 15px;
  justify-items: center;
}

.bubble {
  border: 1px solid white;
  border-radius: 20px;
  padding: 0.8em;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background:transparent;
  backdrop-filter:blur(20px);
  margin-bottom: 20px;
} */

</style>