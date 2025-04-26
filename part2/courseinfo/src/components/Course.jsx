const Header = ({ courseName }) => <h1>{courseName}</h1>


const Part = ({ name, exercises }) => <p>{name} {exercises}</p>


const Content = ({ courseParts }) => {
    return (
        <>
            {courseParts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, item) => {
        return accumulator += item.exercises;
    }, 0)
    return <p>Number of exercises {total}</p>
}

const Course = ({ course }) => {
    return (
        <>
            <Header courseName={course.name} />
            <Content courseParts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course