import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from "@mui/material";

import { Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: Diagnosis) => void;
}

const AddDiagnosisForm = ({ onCancel, onSubmit }: Props) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [latin, setLatin] = useState("");

  const addDiagnosis = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      code,
      name,
      latin,
    });
  };

  return (
    <div>
      <form onSubmit={addDiagnosis}>
        <TextField
          label="code"
          fullWidth
          required
          value={code}
          onChange={({ target }) => setCode(target.value)}
        />
        <TextField
          label="name"
          fullWidth
          required
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="Latin"
          //placeholder="YYYY-MM-DD"
          fullWidth
          value={latin}
          onChange={({ target }) => setLatin(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiagnosisForm;
