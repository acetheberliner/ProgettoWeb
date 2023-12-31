<template>
  <div class="background">
    <div class="form-container">
      <div class="title">
        <h2>Login</h2>
      </div>
      <form>
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
        <div class="form-group">
          <input
            required
            type="password"
            class="input"
            id="password"
            v-model="password"
          />
          <label class="label" for="password">Password</label>
        </div>
        <div class="form-group box-center">
          <button type="submit">Accedi</button>
        </div>
      </form>
      <div class="paragraph">
        <p>Non hai un account? <a href="/register">Registrati</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

.title {
  margin-bottom: 2rem;
}
.form-container {
  background-color: rgba(255, 255, 255, 0.3);
  /* background:transparent;
    backdrop-filter:blur(20px); */
  padding: 5vh;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.form-elements {
  margin: 10px;
}

form {
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
  font-size: 1rem;
  position: relative;
  --primary: #024454;
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

button {
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

button:hover {
  background-color: #502ace;
  filter: drop-shadow(0px 0px 10px rgba(255, 242, 242, 0.733));
}
</style>
