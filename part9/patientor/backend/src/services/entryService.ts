import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { Patient, Entry, EntryWithoutId } from "../../types";

export const getEntry = (id: string): Entry[] | EntryWithoutId[] | null => {
  const entry: Patient[] = data.filter((patient: Patient) => patient.id === id);

  if (entry[0]) {
    return entry[0].entries;
  }
  return null;
};

export const createEntry = (
  idPatient: string,
  entry: EntryWithoutId,
): Entry => {
  const id: string = uuid();
  const patient: Patient | undefined = data.find(
    (patient: Patient) => patient.id === idPatient,
  );

  const newEntry = {
    id: id,
    ...entry,
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  createEntry,
};
