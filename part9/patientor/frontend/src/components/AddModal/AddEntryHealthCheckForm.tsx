import * as React from "react";

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

import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";

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

interface HealthOption {
  value?: HealthCheckRating | false;
  label?: string;
}

const healthOption: HealthOption[] = Object.entries(HealthCheckRating).map(
  (v) => {
    return {
      value: !isNaN(Number(v[1])) && Number(v[1]),
      label: v[0],
    };
  },
);

const AddEntryHealthCheckForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [date, setDate] = React.useState("");
  const [specialist, setSpecialist] = React.useState("");
  const [description, setDescription] = React.useState("");
  //const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [diagnosisCodeslist, setDiagnosisCodesList] = React.useState<string[]>(
    [],
  );
  // const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
  //   HealthCheckRating.LowRisk,
  // );
  const [healthCheckRating, setHealthCheckRating] = React.useState(
    HealthCheckRating.CriticalRisk,
  );
  const theme = useTheme();
  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;

      const healthCheckRating = Object.values(HealthCheckRating).find(
        (g) => Number(g) === value,
      );

      if (healthCheckRating) {
        setHealthCheckRating(Number(healthCheckRating));
      }
    }
  };

  const onDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodeslist>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodesList(typeof value === "string" ? value.split(",") : value);
  };

  const addEntryHealthCheck = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //setDiagnosisCodesList(diagnosisCodeslist.concat(diagnosisCodes));
    onSubmit({
      type: "HealthCheck",
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodeslist,
      healthCheckRating,
    });
  };

  return (
    <div>
      <form onSubmit={addEntryHealthCheck}>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          style={{ width: "545px", height: "30px" }}
        />
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
          //placeholder="YYYY-MM-DD"
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
          //placeholder="YYYY-MM-DD"
          fullWidth
          disabled
          value={diagnosisCodeslist}
          onChange={({ target }) => setDiagnosisCodesList([target.value])}
        />
        {/* <TextField
          label="healthCheckRating"
          //placeholder="YYYY-MM-DD"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        /> */}
        <InputLabel style={{ marginTop: 20 }}>Rating</InputLabel>
        <Select
          label="Rating"
          fullWidth
          value={Number(healthCheckRating)}
          onChange={onHealthCheckRatingChange}
        >
          {healthOption.map((option) => (
            <MenuItem key={option.label} value={Number(option.value)}>
              {isNaN(Number(option.label)) && option.label}
            </MenuItem>
          ))}
        </Select>
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

export default AddEntryHealthCheckForm;
