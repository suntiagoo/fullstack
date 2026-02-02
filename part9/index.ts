import express from "express";
import { imc } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const heightParm: number = Number(_req.query.height);
  const weightparm: number = Number(_req.query.weight);

  if (isNaN(heightParm) || isNaN(weightparm)) {
    res.status(404).json({ error: '"malformatted parameters"' });
  }

  const { weight, height, bmi } = imc(weightparm, heightParm);
  return res.status(200).json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
