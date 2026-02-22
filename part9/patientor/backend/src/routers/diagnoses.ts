import express from "express";
import diagnose from "../services/diagnoseService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.status(200).json(diagnose.getAll());
});

diagnosesRouter.post("/", (_req, res) => {
  res.status(200).json(diagnose.createDiagnose(_req.body));
});
export default diagnosesRouter;
