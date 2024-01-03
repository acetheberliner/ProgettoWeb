<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Nota } from "../types";

export default defineComponent({
  props: {
    nota: {
      type: Object as PropType<Nota>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="note">
    <section>
      <h3>{{ nota.titolo }}</h3>
      <p class="categoria">{{ nota.categoria }}</p>
      <p class="autore">{{ nota.autore }}</p>
      <hr />
      <p>{{ nota.testo }}</p>
    </section>
  </div>
</template>

<style scoped>
/*-SCROLLBAR-------------------------------------------------------------------------------------------------------------------*/
/*- NOTE -------------------------------------------------------------------------------------------------------------------*/
.note {
  border-radius: 12px;
  background: linear-gradient(45deg, #ffffff, #e6e6e6);
  box-shadow: 5px -5px 10px #f0f0f038, -5px 5px 10px #ffffff1c;
  padding: 10px;
  margin: 20px;
  color: #235971;
  text-align: center;
}

@font-face {
  font-family: clipFont;
  src: url("/fonts/colieplay.regular.ttf");
}

h3 {
  font-family: clipFont;
  font-size: 36px;
  font-weight: bold;
  text-align: start;
  margin-left: 10px;
  margin-top: 10px;
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

p.categoria,
p.autore {
  font-weight: bold;
  text-align: end;
  margin-right: 10px;
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
