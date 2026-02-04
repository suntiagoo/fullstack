import { text } from "node:stream/consumers";
import { NewPatientEntry, Gender } from "../types";

const isString = (name: unknown): name is string => {
  return typeof name === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date:" + date);
  }
  return date;
};

// const isNumber = (ssn: unknown): ssn is number => {
//   return typeof ssn === "number" || ssn instanceof Number;
// };

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing occupation");
  }
  return text;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error("Incorrect or missing occupation");
  }
  return param;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
