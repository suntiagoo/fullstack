import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

import { Diagnosis, EntryWithoutId } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  code: string,
  diagnosisCodeslist: readonly string[],
  theme: Theme,
) {
  return {
    fontWeight: diagnosisCodeslist.includes(code)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosis: Diagnosis[] | undefined;
}

const AddEntryHospitalForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodeslist, setDiagnosisCodesList] = useState<string[]>([]);
  const [discharge, setDischarge] = useState({
    date: "",
    criteria: "",
  });

  const theme = useTheme();

  const AddEntryHospital = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "Hospital",
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodeslist,
      discharge,
    });
  };

  const onDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodeslist>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodesList(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        style={{ width: "545px", height: "30px" }}
      />
      <form onSubmit={AddEntryHospital}>
        <TextField
          label="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          required
          disabled
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          label="specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <div>
          <FormControl sx={{ m: 0, width: 550 }}>
            <InputLabel id="demo-multiple-chip-label">Code</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={diagnosisCodeslist}
              onChange={onDiagnosisChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {diagnosis?.map((diagnosis) => (
                <MenuItem
                  key={diagnosis.code}
                  value={diagnosis.code}
                  style={getStyles(diagnosis.code, diagnosisCodeslist, theme)}
                >
                  {diagnosis.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TextField
          label="diagnosisCodes"
          fullWidth
          disabled
          value={diagnosisCodeslist}
          onChange={({ target }) => setDiagnosisCodesList([target.value])}
        />
        <TextField
          label="discharge date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={discharge.date}
          onChange={({ target }) =>
            setDischarge({ ...discharge, date: target.value })
          }
        />
        <TextField
          label="discharge criteria"
          fullWidth
          value={discharge.criteria}
          onChange={({ target }) =>
            setDischarge({ ...discharge, criteria: target.value })
          }
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

export default AddEntryHospitalForm;
