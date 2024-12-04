const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    
    const sum = parts.reduce((total, part) => total + part.exercises, 0);

    return (
        <p><b>total of {sum} exercises</b></p>
    )
} 

const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part}/>)

const Course = ({course}) => {
  return (
    <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )
}

export default Course;