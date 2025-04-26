
const Header = ({ courseName }) => <h1>{courseName}</h1>


const Part = ({ name, exercises }) => <p>{name} {exercises}</p>


const Content = ({ courseParts }) => {
  return (
    <>
      <Part name={courseParts[0].name} exercises={courseParts[0].exercises} />
      <Part name={courseParts[1].name} exercises={courseParts[1].exercises} />
      <Part name={courseParts[2].name} exercises={courseParts[2].exercises} />
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
export default App
