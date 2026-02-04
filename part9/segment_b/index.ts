import express from "express";
import { imc } from "./bmiCalculator";
import { statistical, daily_list } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises)
    return res.status(404).send({ error: "parameters missing" });
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises))
    return res.status(404).send({ error: "malformatted parameters" });

  const exercises = daily_exercises as daily_list;

  return res
    .status(200)
    .json(statistical({ daily_exercises: exercises, target: Number(target) }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
