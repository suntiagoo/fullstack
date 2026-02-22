import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";
import AddDiagnosisForm from "./AddDiagnosisForm";
import { Diagnosis, EntryWithoutId } from "../../types";
import AddEntryHealthCheckForm from "./AddEntryHealthCheckForm";
import AddEntryHospitalForm from "./AddEntryHospitalForm";
import AddEntryOccupationalHealthcareForm from "./AddEntryOccupationalHealthcareForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmitDiagnisis?: (values: Diagnosis) => void;
  onSubmitEntry?: (values: EntryWithoutId) => void;
  error?: string;
  type?: string;
  diagnosis: Diagnosis[] | undefined;
}

// const hospitalModal = (
//   modalOpen: boolean,
//   onClose: () => void,
//   onSubmitEntry?: (values: EntryWithoutId) => void,
//   error?: string,
// ) => (
//   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
//     <DialogTitle>Add a new entry hospitalModal</DialogTitle>
//     <Divider />
//     <DialogContent>
//       {error && <Alert severity="error">{error}</Alert>}

//       {onSubmitEntry && (
//         <AddEntryForm onSubmit={onSubmitEntry} onCancel={onClose} />
//       )}
//     </DialogContent>
//   </Dialog>
// );

// const healthCheckModal = (
//   modalOpen: boolean,
//   onClose: () => void,
//   onSubmitEntry?: (values: EntryWithoutId) => void,
//   error?: string,
// ) => (
//   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
//     <DialogTitle>Add a new entry healthCheckModal</DialogTitle>
//     <Divider />
//     <DialogContent>
//       {error && <Alert severity="error">{error}</Alert>}

//       {onSubmitEntry && (
//         <AddEntryHealthCheckForm onSubmit={onSubmitEntry} onCancel={onClose} />
//       )}
//     </DialogContent>
//   </Dialog>
// );

// const diagnosisModal = (
//   modalOpen: boolean,
//   onClose: () => void,
//   onSubmitDiagnisis?: (values: Diagnosis) => void,
//   error?: string,
// ) => (
//   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
//     <DialogTitle>Add a new entry diagnosisModal</DialogTitle>
//     <Divider />
//     <DialogContent>
//       {error && <Alert severity="error">{error}</Alert>}

//       {onSubmitDiagnisis && (
//         <AddDiagnosisForm onSubmit={onSubmitDiagnisis} onCancel={onClose} />
//       )}
//     </DialogContent>
//   </Dialog>
// );

// const occupationalHealthcareModal = (
//   modalOpen: boolean,
//   onClose: () => void,
//   onSubmitEntry?: (values: EntryWithoutId) => void,
//   error?: string,
// ) => (
//   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
//     <DialogTitle>Add a new entry healthCheckModal</DialogTitle>
//     <Divider />
//     <DialogContent>
//       {error && <Alert severity="error">{error}</Alert>}

//       {onSubmitEntry && (
//         <AddEntryForm onSubmit={onSubmitEntry} onCancel={onClose} />
//       )}
//     </DialogContent>
//   </Dialog>
// );

// const AddModel = ({
//   modalOpen,
//   onClose,
//   onSubmitDiagnisis,
//   onSubmitEntry,
//   error,
//   type,
// }: Props) => {
//   switch (type) {
//     case "hospital":
//       console.log("hola", type);
//       return hospitalModal(modalOpen, onClose, onSubmitEntry, error);
//     case "healthCheck":
//       console.log("ok", type);
//       return healthCheckModal(modalOpen, onClose, onSubmitEntry, error);
//     case "diagnosis":
//       console.log("bye", type);
//       return diagnosisModal(modalOpen, onClose, onSubmitDiagnisis, error);
//       case "occupationalHealthcare":
//       console.log("bye", type);
//       return occupationalHealthcareModal(modalOpen, onClose, onSubmitDiagnisis, error);
//   }
//   return null;
// };

// export default AddModel;

const AddModel = ({
  modalOpen,
  onClose,
  onSubmitDiagnisis,
  onSubmitEntry,
  error,
  type,
  diagnosis,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>
      {type === "diagnosis"
        ? "Add a new diagnosis"
        : type === "healthCheck"
          ? "Add a new healthCheck"
          : type === "hospital"
            ? "Add a new hospital"
            : "Add a new occupationalHealthcareModal"}
    </DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      {onSubmitDiagnisis && type === "diagnosis" ? (
        <AddDiagnosisForm onSubmit={onSubmitDiagnisis} onCancel={onClose} />
      ) : type === "healthCheck" && onSubmitEntry ? (
        <AddEntryHealthCheckForm
          onSubmit={onSubmitEntry}
          onCancel={onClose}
          diagnosis={diagnosis}
        />
      ) : type === "hospital" && onSubmitEntry ? (
        <AddEntryHospitalForm
          onSubmit={onSubmitEntry}
          onCancel={onClose}
          diagnosis={diagnosis}
        />
      ) : onSubmitEntry ? (
        <AddEntryOccupationalHealthcareForm
          onSubmit={onSubmitEntry}
          onCancel={onClose}
          diagnosis={diagnosis}
        />
      ) : null}
      {/* {onSubmitEntry && (
        <AddEntryHealthCheckForm onSubmit={onSubmitEntry} onCancel={onClose} />
      )} */}
    </DialogContent>
  </Dialog>
);
export default AddModel;
