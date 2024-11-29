<template>
  <div>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/map">Map</router-link>
      </div>
      <p>{{ currentCity.cityName }}</p>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLocationStore } from "./stores/store";

const locationStore = useLocationStore();
const { currentCity } = storeToRefs(locationStore);
</script>
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav div {
  display: flex;
  gap: 20px;
}
</style>
