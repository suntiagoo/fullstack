import Course from './components/Course'

const App = ({ course }) => {

  return (
    <div>
      {course.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}
export default App
