import express from "express";
import diagnose from "../services/diagnoseService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  console.log("diagnoses");
  res.status(200).json(diagnose.getAll());
});

export default diagnosesRouter;
