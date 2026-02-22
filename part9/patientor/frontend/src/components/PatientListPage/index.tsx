import { useState } from "react";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients?: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientUnit?: boolean;
}

const PatientListPage = ({ patients, setPatients, patientUnit }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const id = useParams().id;
  const patientUnique: Patient[] = patients.filter(
    (patient: Patient) => patient.id === id,
  );

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      if (setPatients) setPatients(patients.concat(patient));
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
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          {patientUnit
            ? `patient: ${patientUnique[0] ? patientUnique[0].name : ""} `
            : "Patient list"}
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patientUnit ? patientUnique : patients).map(
            (patient: Patient) => (
              <TableRow key={patient.id}>
                {
                  <TableCell>
                    {" "}
                    <Link
                      style={{ color: "coral", textDecoration: "none" }}
                      to={`/patients/${patient.id}`}
                    >
                      {patient.name}
                    </Link>
                  </TableCell>
                }
                <TableCell>
                  {patient.gender === "female" ? (
                    <WomanIcon />
                  ) : patient.gender === "male" ? (
                    <ManIcon />
                  ) : (
                    "other"
                  )}
                </TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell>
                  <HealthRatingBar showText={false} rating={1} />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
