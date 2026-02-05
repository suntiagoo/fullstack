//import { useState } from 'react'
import "./App.css";
import type { Course, mount, BodyProp, CoursePart, Element } from "./types";

const Header = (prop: Course) => {
  return <h1>{prop.name}</h1>;
};

const Part = ({ element }: Element) => {
  switch (element.kind) {
    case "basic":
      return (
        <>
          <li>
            <b>
              {element.name} {element.exerciseCount}
            </b>
          </li>

          <p>{element.description}</p>
        </>
      );
    case "group":
      return (
        <>
          <li>
            <b>
              {element.name} {element.exerciseCount}
            </b>
          </li>

          <p>{`project exercises: ${element.groupProjectCount}`}</p>
        </>
      );
    case "background":
      return (
        <>
          <li>
            <b>{`${element.name} ${element.exerciseCount}`}</b>
          </li>
          <p>{element.description}</p>
          <p>{element.backgroundMaterial}</p>
        </>
      );
  }
};

const Content = ({ body }: BodyProp) => {
  return (
    <ul>
      {body.map((course) => {
        return <Part element={course} />;
        // return (
        //   <li key={course.name}>
        //     {" "}
        //     <p>
        //       {course.name} {course.exerciseCount}
        //     </p>
        //   </li>
        // );
      })}
    </ul>
  );
};

const Total = (prop: mount) => {
  return <p>{`Number of exercises: ${prop.total}`}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content body={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
