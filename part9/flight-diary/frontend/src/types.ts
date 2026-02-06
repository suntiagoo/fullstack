export declare const enum Weather {
  sunny = "sunny",
  windy = "windy",
  cloudy = "cloudy",
  rainy = "rainy",
  stormy = "stormy",
}

export declare enum Visibility {
  great = "great",
  good = "good",
  ok = "ok",
  poor = "poor",
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}
export interface Blog {
  blogs: Diary[];
}

export type Diaryreview = Omit<Diary, "id">;

export interface Message {
  text: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[] | undefined>;
}
