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
      <!-- <p>{{ nota.testo }}</p> -->
      <p class="anteprima">{{ nota.anteprima }}</p>
    </section>
    <button>
      <span> Visualizza </span>
    </button>
  </div>
</template>

<style scoped>
/*- BUTTON -------------------------------------------------------------------------------------------------------------------*/
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
  transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover {
  animation: sh0 0.5s ease-in-out both;
}

@keyframes sh0 {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(7deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-7deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}

button:hover span {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

button::before,
button::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.15s cubic-bezier(0.02, 0.01, 0.47, 1);
  z-index: -1;
  transform: translate(100%, -25%) translate3d(0, 0, 0);
}

button:hover::before,
button:hover::after {
  opacity: 0.15;
  transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover::before {
  transform: translate3d(50%, 0, 0) scale(0.9);
}

button:hover::after {
  transform: translate(50%, 0) scale(1.1);
}

/*----------------------------------------------------------------------------------------------------------------------------*/

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

p.anteprima {
  margin-bottom: 20px;
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
