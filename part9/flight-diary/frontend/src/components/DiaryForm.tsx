import { useState } from "react";
import type { Diary, Diaryreview, Visibility, Weather } from "../types";
import { create } from "../services/DiaryService";
import axios from "axios";

interface ChildProps {
  diary: Diary[];
  setDiary: React.Dispatch<React.SetStateAction<Diary[]>>;
  setNotify: React.Dispatch<React.SetStateAction<string | null>>;
}

const DiaryForm: React.FC<ChildProps> = ({ diary, setDiary, setNotify }) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState("");

  const handleForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newDiary: Diaryreview = {
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      };
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      const result: Diary = await create(newDiary);
      if (result) {
        setDiary([...diary, result]);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data &&
          typeof error?.response?.data === "string"
        ) {
          const message = error.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          setTimeout(() => {
            setNotify(null);
          }, 5000);
          setNotify(message);
          console.log(error.response);
        }
      } else {
        console.error(error);
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          id="diaryForm"
          onSubmit={handleForm}
        >
          date:{" "}
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <fieldset>
            <legend>visibility</legend>

            <div>
              <input
                type="radio"
                id="great"
                name="visibility"
                value="great"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="great">great</label>
            </div>

            <div>
              <input
                type="radio"
                id="good"
                name="visibility"
                value="good"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="great">good</label>
            </div>

            <div>
              <input
                type="radio"
                id="ok"
                name="visibility"
                value="ok"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="great">ok</label>
            </div>
            <div>
              <input
                type="radio"
                id="poor"
                name="visibility"
                value="poor"
                onChange={(event) => setVisibility(event.target.value)}
              />
              <label htmlFor="great">poor</label>
            </div>
          </fieldset>
          visibility:{" "}
          <input
            id="weather"
            value={visibility}
            readOnly
            //onChange={(event) => setWeather(event.target.value)}
          />
          <fieldset>
            <legend>weather</legend>

            <div>
              <input
                type="radio"
                id="sunny"
                name="weather"
                value="sunny"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                id="rainy"
                name="weather"
                value="rainy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                id="cloudy"
                name="weather"
                value="cloudy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>
            <div>
              <input
                type="radio"
                id="stormy"
                name="weather"
                value="stormy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="stormy">stormy</label>
            </div>
            <div>
              <input
                type="radio"
                id="windy"
                name="weather"
                value="windy"
                onChange={(event) => setWeather(event.target.value)}
              />
              <label htmlFor="windy">windy</label>
            </div>
          </fieldset>
          weather:{" "}
          <input
            id="weather"
            value={weather}
            readOnly
            //onChange={(event) => setWeather(event.target.value)}
          />
          comment:{" "}
          <input
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <div>
            <button type="submit"> add</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DiaryForm;
