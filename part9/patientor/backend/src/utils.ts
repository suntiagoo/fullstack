import {
  NewPatientEntry,
  Gender,
  Entry,
  HealthCheckRating,
  EntryWithoutId,
} from "../types";

const isString = (name: unknown): name is string => {
  return typeof name === "string" || name instanceof String;
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

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

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
    throw new Error("Incorrect or missing Gender");
  }
  return param;
};

const isList = (param: unknown): param is Array<any> => {
  return param instanceof Array || Array.isArray(param);
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing ssn");
  }
  return criteria;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(Number(rating));
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!isNumber(param) || !isHealthCheckRating(Number(param))) {
    throw new Error("Incorrect or missing Rating");
  }
  return param;
};

const parseEmployerName = (EmployerName: unknown): string => {
  if (!EmployerName || !isString(EmployerName)) {
    throw new Error("Incorrect or missing EmployerName");
  }
  return EmployerName;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const parseEntryList = (
  param: unknown,
): Array<Entry | EntryWithoutId> | [] => {
  if (!param || !isList(param)) {
    throw new Error("Incorrect or missing entry");
  }
  if (param.length === 0) {
    return param;
  }
  const result: Entry[] = param.map((entry: Entry) => {
    let entryResult: Entry;
    if (
      "type" in entry &&
      "description" in entry &&
      "date" in entry &&
      "specialist" in entry
    ) {
      if (
        !isString(entry.type) ||
        !isString(entry.description) ||
        !parseDate(entry.date) ||
        !isString(entry.specialist)
      ) {
        throw new Error("Incorrect or missing entry");
      }
      switch (entry.type) {
        case "Hospital":
          if ("discharge" in entry) {
            entryResult = {
              ...entry,
              discharge: {
                date: parseDate(entry.discharge.date),
                criteria: parseCriteria(entry.discharge.criteria),
              },
            };
            return entryResult;
          }
          throw new Error("Incorrect data: some fields are missing Hospital");

        case "HealthCheck":
          if ("healthCheckRating" in entry) {
            entryResult = {
              ...entry,
              healthCheckRating: parseHealthCheckRating(
                entry.healthCheckRating,
              ),
            };
            return entryResult;
          }
          throw new Error(
            "Incorrect data: some fields are missing HealthCheck",
          );
        case "OccupationalHealthcare":
          if ("employerName" in entry) {
            if ("sickLeave" in entry) {
              entryResult = {
                ...entry,
                employerName: parseEmployerName(entry.employerName),
                sickLeave: {
                  startDate: parseDate(entry.sickLeave.startDate),
                  endDate: parseDate(entry.sickLeave.endDate),
                },
              };
            }
            entryResult = {
              ...entry,
              employerName: parseEmployerName(entry.employerName),
            };
            return entryResult;
          }
          throw new Error(
            "Incorrect data: some fields are missing OccupationalHealthcare",
          );
        default:
          return assertNever(entry);
      }
    }
    throw new Error("Incorrect data: some fields are missing 3");
  });
  return result;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data55");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntryList(object.entries),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing 5");
};

export default toNewPatient;
