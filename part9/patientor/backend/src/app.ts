import express from "express";
import patientRouter from "./routers/patients";
import diagnosesRouter from "./routers/diagnoses";
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require("cors");
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

export default app;
