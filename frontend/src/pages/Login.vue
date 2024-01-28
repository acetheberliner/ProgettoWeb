<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";


export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      pasShow: false
    };
  },
  methods: {
    async onSubmit() {
      try {
        await axios.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        });
        window.location.href = "/myaccount";
      } catch (e: any) {
        if (e.response) {
          alert(
            `${e.response.status} - ${e.response.statusText}\n${e.response.data}`
          );
        } else {
          alert(e.message);
        }
      }
    },

    togglePasswordVisibility() {
      const passwordInput = document.getElementById("password") as HTMLInputElement;
      if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      }
      this.pasShow = !this.pasShow;
    }
  },
});
</script>

<template>
  <div class="background">
    <div class="form-container">
      <div class="title">
        <h2>Accesso</h2>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <input
            required
            type="text"
            class="input"
            id="username"
            v-model="username"
          />
          <label class="label" for="username">Username</label>
        </div>
        <div class="form-group password">
          <input required type="password" class="input" id="password" v-model="password" />
          <label class="label" for="password">Password</label>
          <i class="bi bi-eye-slash h4" v-if="pasShow" @click="togglePasswordVisibility"></i>
          <i class="bi bi-eye h4" v-if="!pasShow" @click="togglePasswordVisibility"></i>
        </div>
        <div class="form-group box-center">
          <button class="submit" type="submit">Accedi</button>
        </div>
      </form>
      <div class="paragraph">
        <p>
          Non hai un account?
          <RouterLink to="/register">Registrati</RouterLink>
        </p>
      </div>
    </div>
    <div class="animation">
      <lottie-player src="https://lottie.host/c820d734-8749-4a16-bc7d-dd425d8a5c7d/htiGNpHjkw.json" background="transparent" speed="1" style="width: 550px; height: 550px" direction="1" mode="normal" loop autoplay></lottie-player>
    </div>
  </div>
</template>

<style scoped>

@media screen and (max-width: 1300px){
  .form-container {
    background-color: rgba(255, 255, 255, 0.3);
    /* background:transparent;
      backdrop-filter:blur(20px); */
    padding: 4vh;
    border-radius: 10px;
    border: 1px solid gray;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    margin-top: 200px;
    margin: 3.5em;
  }

  .background {
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

.animation {
  display: none;
}

}
/*------------------------------------------------------------------------------------ */

@media screen and (min-width: 1301px){
  .background {
    margin-top: 130px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%; /* Imposta l'altezza per rendere visibile il contenuto */
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: center;
    vertical-align: middle;
    background-attachment: fixed;
    overflow: hidden;
  }

  .form-container {
    background-color: rgba(255, 255, 255, 0.3);
    /* background:transparent;
      backdrop-filter:blur(20px); */
    padding: 7vh;
    border-radius: 10px;
    border: 1px solid gray;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    display: block;
    /* margin-right: auto; */
    width: fit-content;
    height: fit-content;
  }
  
  .animation{
    display: flex;
    justify-content: flex-end;
    margin-left: 15em;
    
  }

}
/*------------------------------------------------------------------------------ */

* {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.title {
  margin-bottom: 2rem;
}

.password {
  display: flex;
}

i {
  margin-left: 7%;
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

form {
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
  font-size: 1rem;
  position: relative;
  --primary: #024454;
  place-items: center;
}

h2 {
  text-align: center;
  color: #ffffff;
  font-weight: bold;
}

p {
  font-size: 13px;
  text-align: center;
  text-transform: none;
}

a {
  font-size: 14px;
  font-weight: bold;
  color: #0011fa;
}

a:hover {
  text-decoration: none;
  font-weight: bold;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.884));
}

.input {
  all: unset;
  color: #d4d4d4;
  padding: 0.9rem;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.input:focus {
  border: 1px solid;
}

.input:is(:focus, :valid) ~ label {
  transform: translateY(-90%) translateX(-20%) scale(0.65);
  border-radius: 10px;
  background-color: #d4d4d4;
  padding-inline: 0.3rem;
  font-size: 1.35rem;
  color: var(--primary);
  padding-inline: 0.4rem;
  font-weight: bold;
}

.label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #d4d4d4;
  pointer-events: none;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

label {
  display: block;
  margin-bottom: 8px;
  color: #d4d4d4;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #024454;
  border-radius: 4px;
  box-sizing: border-box;
}

button.submit {
  background-color: #6141ce;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.box-center {
  text-align: center;
}

button.submit:hover {
  background-color: #502ace;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}
</style>
