<template>
  <Navbar class="mb-4"></Navbar>
  <router-view />
</template>

<script>
import Navbar from "./components/navigation/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  border-bottom: darkgray;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0275d8;
  text-underline-position: below;
}
</style>
