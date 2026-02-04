export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type Gender2 = "male" | "female" | "other";

export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}
