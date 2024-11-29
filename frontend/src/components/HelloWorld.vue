<template>
  <div class="card">
    <p>{{ name }} or {{ fancyName }}</p>
    count is {{ count }}
    <p>Double count: {{ doubleCount }}</p>
  </div>
  <div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
  <div>
    <input type="text" placeholder="Enter new name" @input="onNameChange" />
  </div>
  <div>
    <p>Your position: {{ currentCity.cityName }}</p>
    <ul>
      <li>lat: {{ currentCity.lat }}</li>
      <li>long: {{ currentCity.lon }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  useCounterStore,
  useNameStore,
  useLocationStore,
} from "../stores/store";

const store = useCounterStore();
const nameStore = useNameStore();
const locationStore = useLocationStore();
const { name, fancyName } = storeToRefs(nameStore);
const { doubleCount, count } = storeToRefs(store);
const { currentCity } = storeToRefs(locationStore);
const { increment, decrement } = store;

const onNameChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  nameStore.changeName(input.value);
};
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
