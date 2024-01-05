<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Nota } from "../types";

export default defineComponent({
  props: {
    nota: Object as PropType<Nota>,
  },
});
</script>

<template>
  <div class="note">
    <section>
      <h3>{{ nota?.titolo }}</h3>
      <p class="categoria">{{ nota?.categoria }}</p>
      <p class="autore">{{ nota?.autore }}</p>
      <hr />
      <!-- <p>{{ nota.testo }}</p> -->
      <p class="anteprima">{{ nota?.anteprima }}</p>
    </section>
    <button class="open">
      <span
        ><a
          id="open"
          href="javascript:void(0)"
          onclick="document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'"
          >Visualizza</a
        ></span
      >
    </button>
  </div>
  <div id="light" class="white_content">
    <div class="title">
      <h2>
        {{ nota?.titolo }}
        <div class="svgicon">
          <img src="/paper-document-svgrepo-com.svg" alt="" />
        </div>
      </h2>
    </div>
    <div class="secondary_info">
      {{ nota?.categoria }}<br />
      {{ nota?.autore }}<br />
      {{ nota?.data }}
    </div>
    <hr />
    <p id="inner_note">{{ nota?.testo }}</p>
    <a
      id="close"
      href="javascript:void(0)"
      onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'"
      >Chiudi</a
    >
  </div>
  <div id="fade" class="black_overlay"></div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Quicksand&display=swap");
/*- ANTEPRIMA -------------------------------------------------------------------------------------------------------------------*/
h2 {
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
}

img {
  width: 50px;
  margin-right: 15px;
}

.svgicon {
  text-align: end;
  margin-right: -12px;
}

a#open {
  color: white;
  text-decoration: none;
}

p#inner_note {
  color: #183252;
}

a#close {
  color: #183252;
  text-decoration: none;
  width: fit-content;
  bottom: 10px;
  right: 10px;
  padding: 0.8em 1em;
  display: flex;
  margin-top: 10px;
  margin-left: 8px;
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

.secondary_info {
  text-align: end;
  font-weight: bold;
  margin-right: 10px;
}

.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.815);
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.white_content {
  display: none;
  position: absolute;
  top: 18%;
  left: 20%;
  width: 60%;
  height: 65%;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
  color: #183252;
  z-index: 1002;
  overflow: auto;
}
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

button:hover,
a#close:hover {
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

button:hover,
a#close:hover span {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
}

button::before,
a#close:before button::after,
a#close:after {
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
a#close:hover::before button:hover::after,
a#close:hover::after {
  opacity: 0.15;
  transition: transform 0.2s cubic-bezier(0.02, 0.01, 0.47, 1),
    opacity 0.2s cubic-bezier(0.02, 0.01, 0.47, 1);
}

button:hover::before,
a#close:hover::before {
  transform: translate3d(50%, 0, 0) scale(0.9);
}

button:hover::after,
a#close:hover::after {
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
  /* font-family: clipFont; */
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
