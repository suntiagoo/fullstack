import { Diagnosis, Entry } from "../../types";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";

interface Props {
  entry: Entry;
  diagnosis: Diagnosis[] | undefined;
}

const EntriesList = ({ entry, diagnosis }: Props) => {
  // const diagnosisObject = (code: string) => {
  //   return diagnosis?.map((diagnisis: Diagnosis) => {
  //     return diagnisis.code === code ? (
  //       <li key={code}>
  //         {" "}
  //         {`code: ${code} `} {`name: ${diagnisis.name}`}
  //       </li>
  //     ) : false;
  //   });
  // };

  // const diagnosisShow = (entry: Entry) => {
  //   return entry.diagnosisCodes?.map((dianoseCode: string) => {
  //     return diagnosisObject(dianoseCode);
  //   });
  // };

  const diagnosisObject = (dianoseCode: string) => {
    return diagnosis?.find((diagnisis: Diagnosis) => {
      if (dianoseCode === diagnisis.code) return diagnisis;
    });
  };

  const diagnosisShow = (entry: Entry) => {
    return entry.diagnosisCodes?.map((dianoseCode: string) => {
      const diagnosis = diagnosisObject(dianoseCode);

      if (diagnosis && diagnosis?.code === dianoseCode) {
        return (
          <li key={dianoseCode}>
            {`code: ${dianoseCode}`} {`name: ${diagnosis.name}`}
          </li>
        );
      }
      return <li key={dianoseCode}>{`code: ${dianoseCode}`}</li>;
    });
  };

  const baseEntry = () => {
    return (
      <>
        <p>
          {`date: ${entry.date}`}{" "}
          <CalendarMonthIcon style={{ color: "blue" }} />
        </p>
        <p>
          {`description: ${entry.description}`}{" "}
          <CommentIcon style={{ color: "violet" }} />
        </p>
        <p> {` speciality: ${entry.specialist}`}</p>
        <ul>{entry.diagnosisCodes && diagnosisShow(entry)}</ul>
      </>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          {baseEntry()}
          <p>{`Rating: ${entry.healthCheckRating}`}</p>
        </>
      );
    case "Hospital":
      if (entry.discharge) {
        return (
          <>
            {baseEntry()}
            <p>{`discharge date: ${entry.discharge.date}`}</p>
            <p>{`discharge criteria: ${entry.discharge.criteria}`}</p>
          </>
        );
      }
      return null;

    case "OccupationalHealthcare":
      if (entry.sickLeave)
        return (
          <>
            {baseEntry()}
            <p>
              {`name's employer: ${entry.employerName}`} <PersonIcon />
            </p>
            <p>{`sick leave start: ${entry.sickLeave.startDate}`}</p>
            <p>{`sick leave end ${entry.sickLeave.endDate}`}</p>
          </>
        );
      return (
        <>
          {baseEntry()}
          <p>
            {`name's employer: ${entry.employerName}`} <PersonIcon />
          </p>
        </>
      );

    default:
      return assertNever(entry);
  }
};

export default EntriesList;
