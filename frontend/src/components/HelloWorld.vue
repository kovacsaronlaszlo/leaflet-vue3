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
    <p>Your position: {{ cityName }}</p>
    <ul>
      <li>lat: {{ lat }}</li>
      <li>long: {{ lon }}</li>
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
const {cityName, lat, lon} = useLocationStore().currentCity;
const { name, fancyName } = storeToRefs(nameStore);
const { doubleCount, count } = storeToRefs(store);
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
