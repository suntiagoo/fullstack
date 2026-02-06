import { useEffect, useState } from "react";
import axios from "axios";
import type { Diary } from "./types";
import DiaryList from "./components/Diary";
import "./App.css";
import { getAll } from "./services/DiaryService";
import DiaryForm from "./components/DiaryForm";
import Notify from "./components/Notify";

function App() {
  const [diary, setDiary] = useState<Diary[]>([]);
  const [notify, setNotify] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAll();

        if (response) {
          setDiary(response);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (
            error?.response?.data &&
            typeof error?.response?.data === "string"
          ) {
            // const message = error.response.data.replace(
            //   "Something went wrong. Error: ",
            //   "",
            // );

            setTimeout(() => {
              setNotify(null);
            }, 3000);
            setNotify(error.response.data);
            console.log(error.response);
          }
        } else {
          console.error(error);
        }
      }
    };
    void fetchData();
  }, []);
  return (
    <div>
      <Notify notify={notify} />
      <DiaryForm diary={diary} setDiary={setDiary} setNotify={setNotify} />
      <DiaryList blogs={diary} />
    </div>
  );
}

export default App;
