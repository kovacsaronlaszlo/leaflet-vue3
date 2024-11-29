import express, { Request, Response } from "express";
import cities from "all-the-cities";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/city", (req: Request, res: Response) => {
  const cityName = req.query.name as string;

  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  const city = cities.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  const [latitude, longitude] = city.loc.coordinates;

  return res.json({
    city: city.name,
    longitude: longitude,
    latitude: latitude,
  });
});

app.get("/city/coords", (req: Request, res: Response) => {
  const latitude = parseFloat(req.query.latitude as string);
  const longitude = parseFloat(req.query.longitude as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }
  console.log('latitude',latitude)
  console.log('longitude',longitude)
  //{"city":"Budapest XI. kerület","longitude":47.47603,"latitude":19.03605}
  console.log(cities.filter(c => c.name.includes("Budapest XI. kerület")))
  const city = cities.find((c) => {
    const [cityLong, cityLat] = c.loc.coordinates;
    return (
      Math.abs(cityLat - latitude) < 0.1 && Math.abs(cityLong - longitude) < 0.1
    );
  });

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  console.log(city)

  return res.json({
    city: city.name,
    longitude: city.loc.coordinates[0],
    latitude: city.loc.coordinates[1],
  });
});

app.get("/cities", (req: Request, res: Response) => {
  const cityData = cities.map((city) => ({
    city: city.name,
    longitude: city.loc.coordinates[0],
    latitude: city.loc.coordinates[1],
  }));

  return res.json(cityData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
