import axios from "axios";
import { Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
  );

  return data;
};

export default {
  create,
};
