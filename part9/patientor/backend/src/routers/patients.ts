import express from "express";
import patient from "../services/patientService";

import entryService from "../services/entryService";
import toNewPatient, { parseEntryList } from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.status(200).json(patient.getAll());
});

patientRouter.get("/:id", (_req, res) => {
  const patientById = patient.findById(_req.params.id.toString());
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

patientRouter.post("/:id/entries", (_req, res) => {
  try {
    const bodyPatient = parseEntryList([_req?.body]);
    console.log("body patient:", bodyPatient);
    if (bodyPatient[0]) {
      const newEntries = entryService.createEntry(
        _req.params.id,
        bodyPatient[0],
      );
      console.log("lo que retorna", newEntries);
      res.status(200).json(newEntries);
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.get("/:id/entries", (_req, res) => {
  const Entry = patient.findById(_req.params.id.toString());
  if (!Entry) {
    res.status(404).send({ error: "the id not exist" });
  }
  res.status(200).json(Entry);
});

export default patientRouter;
