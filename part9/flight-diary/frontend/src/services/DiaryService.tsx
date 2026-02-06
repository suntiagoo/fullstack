import axios from "axios";
import type { Diary, Diaryreview } from "../types";
const baseUrl = "http://localhost:3000";

export const getAll = async () => {
  try {
    const { data } = await axios.get<Diary[]>(`${baseUrl}/api/diaries`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const create = async (object: Diaryreview) => {
  const addDiary = await axios.post(`${baseUrl}/api/diaries`, object);
  return addDiary.data;
};
