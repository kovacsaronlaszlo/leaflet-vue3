import type { City } from "all-the-cities";

export const findClosestCity = (
  cities: City[],
  latitude: number,
  longitude: number
): City | null => {
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  let closestCity: City | null = null;
  let minDistance = Infinity;

  for (const city of cities) {
    const [cityLong, cityLat] = city.loc.coordinates;
    const distance = calculateDistance(latitude, longitude, cityLat, cityLong);

    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  return closestCity;
};
