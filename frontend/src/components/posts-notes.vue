<script lang="ts">
import {defineComponent } from "vue";
import { Nota } from "../types";

export default defineComponent({
  props: {
    nota: {
      type: Object as () => Nota,
      required: true,
      default: () => ({})
    }  
  },
  data() {},
  methods: {
    async visualizzaNota() {
      this.$router.push({ 
        path: `/view/${this.nota.idnote}`
      });
    },
  },
});
</script>

<template>
  <div class="note" v-if="nota.stato == 'approvata'"> 
    <section>
      <h3>{{ nota.titolo }}</h3>
      <p class="categoria">{{ nota.categoria }}</p>
      <p class="autore">{{ nota.autore }}</p>
      <hr />
      <div>
        <p class="stato bg-success">{{ nota.stato }}</p>
      </div>
    </section>
    <div class="open">
      <button @click="visualizzaNota()" id="open">Visualizza</button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Quicksand&display=swap");

@media screen and (max-width: 1589px) {}

@media screen and (min-width: 1590px) {}
.open{
  margin-top: 50px;
}

button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0.8em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  background-color: #356cb1;
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
  font-family: inherit;
  z-index: 0;
  overflow: hidden;
  box-shadow: rgb(29, 44, 59) 0px 10px 20px -10px;
}

.note {
  position: relative;
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #e6e6e6);
  box-shadow: 5px -5px 10px #f0f0f038, -5px 5px 10px #ffffff1c;
  padding: 10px;
  margin: 10px;
  color: #235971;
  text-align: center;
}

h3 {
  font-family: "Quicksand", sans-serif;
  font-size: 28px;
  font-weight: bold;
  text-align: start;
  margin-left: 10px;
  margin-top: 2px;
}

hr {
  border: none;
  height: 1px;
  background-color: #235971;
  margin: 10px 0;
}

p {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  text-transform: none;
  text-align: start;
  margin-bottom: 0px;
  margin-left: 10px;
  color: #235971;
  filter: drop-shadow(normal);
}

button#open {
  font-weight: bold;
}

p.categoria, p.autore {
  font-weight: bold;
  text-align: end;
  margin-right: 10px;
}

p.stato {
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: bold;
  width: fit-content;
  padding: 0.4em;
  border-radius: 12px;
  font-size: 13px;
  color: #fff;
  cursor: default;
  box-shadow: rgb(29, 44, 59) 0px 10px 20px -10px;
}

p.note-comment {
  text-align: start;
  color: red;
  font-weight: bold;
}
</style>