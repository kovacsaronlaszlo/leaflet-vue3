<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/map">Map</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
