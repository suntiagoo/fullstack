import { useState } from "react";
import axios from "axios";
import { Patient, EntryWithoutId, Entry, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import AddModal from "../AddModal";
import diagnosisService from "../../services/diagnosis";
import entryService from "../../services/entryService";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import { Button } from "@mui/material";
import EntriesList from "./EntriesList";
interface Props {
  patients: Patient[];
  setPatients?: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnosis?: Diagnosis[];
  setDiagnosis: React.Dispatch<React.SetStateAction<Diagnosis[]>>;
}

const PatientUnit = ({
  patients,
  setPatients,
  setDiagnosis,
  diagnosis,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [type, setType] = useState("");
  const [error, setError] = useState<string>();

  const id = useParams().id;

  const patientUnique: Patient | undefined = patients.find(
    (patient: Patient) => {
      return patient.id.toString() === id?.toString();
    },
  );

  const openModal = (value: string): void => {
    setType(value);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewDiagnisis = async (values?: Diagnosis, idEntry?: string) => {
    try {
      if (values) {
        const diagnosisResult = await diagnosisService.create(values);

        if (setDiagnosis)
          setDiagnosis(diagnosis ? diagnosis.concat(diagnosisResult) : []);
        if (patientUnique) {
          const newDiagnisisAdd = patientUnique.entries.filter(
            (entry: Entry) => {
              if (entry.id === idEntry) {
                return entry.diagnosisCodes?.push(diagnosisResult.code);
              }
              return null;
            },
          )[0];
          const restPatients = patients.filter(
            (patient: Patient) => patient.id !== id,
          );

          const restEntry = patientUnique.entries.filter(
            (entry: Entry) => entry.id !== idEntry,
          );

          const patientUpdate: Patient = {
            ...patientUnique,
            entries: restEntry.concat(newDiagnisisAdd),
          };
          if (setPatients) setPatients(restPatients.concat(patientUpdate));
        }
      }
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          console.error("Unknown error", e);
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const submitEntry = async (values: EntryWithoutId) => {
    try {
      if (id) {
        const entryResult = await entryService.create(id, values);

        const result = patients.filter((patient: Patient) => {
          if (patient.id === id) {
            return (patient.entries = patient.entries.concat(entryResult));
          }
          return patient;
        });

        if (setPatients) setPatients(result);
      }
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          console.error("Unknown error", e);
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unrecognized axios error");
      }
    }
  };

  return (
    <>
      <h2>
        {patientUnique && patientUnique.name}{" "}
        {patientUnique?.gender === "female" ? (
          <WomanIcon />
        ) : patientUnique?.gender === "male" ? (
          <ManIcon />
        ) : (
          "other"
        )}
      </h2>
      <p>{`ssn: ${patientUnique?.ssn}`}</p>
      <p>{`occupation: ${patientUnique?.occupation}`}</p>
      <br />
      <h3>Entries</h3>
      {
        <>
          {patientUnique?.entries.map((entry: Entry) => {
            return (
              <div
                key={entry.id}
                style={{ border: "1px solid #42b2e5", marginBottom: "1.5em" }}
              >
                <EntriesList entry={entry} diagnosis={diagnosis && diagnosis} />
                {type === "diagnosis" ? (
                  <AddModal
                    modalOpen={modalOpen}
                    onSubmitDiagnisis={(values: Diagnosis) =>
                      submitNewDiagnisis(values, entry.id)
                    }
                    onClose={closeModal}
                    type={type}
                    error={error}
                    diagnosis={diagnosis}
                  />
                ) : null}

                <Button
                  variant="contained"
                  onClick={() => openModal("diagnosis")}
                >
                  Add New Diagnosis
                </Button>
              </div>
            );
          })}
        </>
      }
      {type === "healthCheck" ||
      type === "hospital" ||
      type === "occupationalHealthcare" ? (
        <AddModal
          modalOpen={modalOpen}
          onSubmitEntry={(values: EntryWithoutId) => submitEntry(values)}
          onClose={closeModal}
          type={type}
          error={error}
          diagnosis={diagnosis}
        />
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={() => openModal("hospital")}>
          Add New entry hospital
        </Button>

        <Button variant="contained" onClick={() => openModal("healthCheck")}>
          Add New entry HealthCheck
        </Button>

        <Button
          variant="contained"
          onClick={() => openModal("occupationalHealthcare")}
        >
          Add New entry OccupationalHealthcare
        </Button>
      </div>
    </>
  );
};
export default PatientUnit;
