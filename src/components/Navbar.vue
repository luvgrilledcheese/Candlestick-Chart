<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/Stocks">Stocks</router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/test">test</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped></style>
