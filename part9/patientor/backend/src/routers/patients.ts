import express from "express";
import patient from "../services/patientService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.status(200).json(patient.getAll());
});

patientRouter.get("/:id", (_req, res) => {
  const patientById = patient.findById(Number(_req.params.id));
  if (!patientById) {
    res.status(404).send({ error: "the id not exist" });
  }
  res.status(200).json(patientById);
});

patientRouter.post("/", (_req, res) => {
  try {
    const bodyPatient = toNewPatient(_req.body);

    const newPatient = patient.createPatient(bodyPatient);
    res.status(200).json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
