export interface Course {
  name: string;
}
export interface mount {
  total: number;
}
export interface Body {
  name: string;
  exerciseCount: number;
}

export interface BodyProp {
  body: CoursePart[];
}

export interface Element {
  element: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionPlusBase extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptionPlusBase {
  //description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescriptionPlusBase {
  //description: string;
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;
