<template>
  <nav id="navbar" class="navbar  navbar-expand-sm ">
    <!--<router-link id="router" class="nav-item nav-link" to="/">Home</router-link>-->
    <router-link id="router" class="nav-item nav-link" to="/createNewPattern"
      >Create a new pattern</router-link
    >
    <router-link id="router" class="nav-item nav-link" to="/concretePatterns"
      >Concrete patterns</router-link
    >
  </nav>
</template>

<style>
#router {
  text-align: center;
  margin-right: 40px;
}
</style>
