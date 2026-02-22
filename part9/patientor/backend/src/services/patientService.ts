import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { Patient, NewPatientEntry } from "../../types";

const getAll = (): Patient[] => {
  return data;
};

const findById = (id: string): Patient | null => {
  const patient = data.find((p) => p.id.toString() === id.toString());
  if (patient) {
    return patient;
  }
  return null;
};

const createPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();

  const newPatient = {
    id: id,
    ...entry,
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  createPatient,
  findById,
};
