<template>
  <div>
    <div id="map" style="height: 90vh; width: 100%"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useLocationStore } from "../stores/store";
import L from "leaflet";

const locationStore = useLocationStore();

let map: L.Map | null = null;

onMounted(() => {
  locationStore.fetchCurrentLocation().then(() => {
    const { lat, lon } = locationStore.currentCity;

    map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat, lon])
      .addTo(map)
      .openPopup();
  });
});
</script>
<style lang=""></style>
