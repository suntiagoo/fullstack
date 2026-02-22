import data from "../../data/diagnoses";
import { Diagnosis } from "../../types";

const getAll = (): Diagnosis[] => {
  return data;
};

const createDiagnose = (object: Diagnosis): Diagnosis => {
  data.push(object);
  return object;
};

export default {
  getAll,
  createDiagnose,
};
