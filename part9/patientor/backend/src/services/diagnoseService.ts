import data from "../../data/diagnoses";
import { Diagnose } from "../../types";

const getAll = (): Diagnose[] => {
  return data;
};

const createDiagnose = () => {
  return null;
};

export default {
  getAll,
  createDiagnose,
};
