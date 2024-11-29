import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});

export const useNameStore = defineStore("name", {
  state: () => ({ name: "Test" }),
  getters: {
    fancyName: (state) => "Fancy " + state.name,
  },
  actions: {
    changeName(newName: string) {
      this.name = newName;
    },
  },
});

export const useLocationStore = defineStore("location", {
  state: () => ({
    currentCity: {
      lat: 0,
      lon: 0,
      cityName: "Unknown",
    },
  }),
  actions: {
    async fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const response = await fetch(
                `http://localhost:8000/city/coords?latitude=${lat}&longitude=${lon}`
              );
              if (response.ok) {
                const data = await response.json();

                this.currentCity = {
                  lat: lat,
                  lon: lon,
                  cityName: data.city,
                };
              } else {
                console.error("City not found in the response.");
                this.currentCity = {
                  lat: lat,
                  lon: lon,
                  cityName: "Unknown Location",
                };
              }
            } catch (error) {
              console.error("Error fetching city by coordinates:", error);
              this.currentCity = {
                lat: lat,
                lon: lon,
                cityName: "Unknown Location",
              };
            }
          },
          (error) => {
            console.error("Error fetching location:", error.message);
            this.currentCity = {
              lat: 0,
              lon: 0,
              cityName: "Unknown Location",
            };
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        this.currentCity = {
          lat: 0,
          lon: 0,
          cityName: "Unknown Location",
        };
      }
    },
  },
});
