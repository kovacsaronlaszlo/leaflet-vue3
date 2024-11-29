import express, { Request, Response } from "express";
import cities from "all-the-cities";
import cors from "cors";
import { findClosestCity } from "./helpers/coordination";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/city", (req: Request, res: Response) => {
  const cityId = Number(req.query.cityId);

  if (!cityId) {
    return res
      .status(400)
      .json({ error: "City ID is required and must be a number" });
  }

  const city = cities.find((c) => c.cityId === cityId);

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  const [longitude, latitude] = city.loc.coordinates;

  return res.json({
    ...city,
    loc: {
      ...city.loc,
      coordinates: {
        latitude,
        longitude
      }
    }
  });
});

app.get("/city/coords", (req: Request, res: Response) => {
  const latitude = parseFloat(req.query.latitude as string);
  const longitude = parseFloat(req.query.longitude as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }
  const city = findClosestCity(cities, latitude, longitude);

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  return res.json({
    ...city,
    loc: {
      ...city.loc,
      coordinates: {
        latitude: city.loc.coordinates[1],
        longitude: city.loc.coordinates[0]
      }
    }
  });
});

app.get("/cities", (req: Request, res: Response) => {
  return res.json(cities);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
