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
  state: () => {
    const storedLocation = localStorage.getItem("location");

    const currentCity = storedLocation
      ? JSON.parse(storedLocation)
      : {
          lat: 0,
          lon: 0,
          cityName: "Unknown",
        };

    return {
      currentCity,
    };
  },
  actions: {
    async fetchCityByCoordinates(lat: number, lon: number) {
      try {
        const response = await fetch(
          `http://localhost:8000/city/coords?latitude=${lat}&longitude=${lon}`
        );
        if (response.ok) {
          const data = await response.json();
          return data.name || "Unknown Location";
        } else {
          console.error("City not found in the response.");
          return "Unknown Location";
        }
      } catch (error) {
        console.error("Error fetching city by coordinates:", error);
        return "Unknown Location";
      }
    },

    async fetchCurrentLocation() {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        this.updateCurrentCity(0, 0, "Unknown Location");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const cityName = await this.fetchCityByCoordinates(lat, lon);
          this.updateCurrentCity(lat, lon, cityName);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          this.updateCurrentCity(0, 0, "Unknown Location");
        }
      );
    },

    updateCurrentCity(lat: number, lon: number, cityName: string) {
      this.currentCity = { lat, lon, cityName };
      localStorage.setItem("location", JSON.stringify(this.currentCity));
    },
  },
});
