import { useState } from 'react'
import './App.css'

const Title = ({ text }) => <h3 >{text}</h3>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ goodValue, neutralValue, badValue }) => {
  return (
    <ul>
      <li>{goodValue}</li>
      <li>{neutralValue}</li>
      <li>{badValue}</li>
    </ul>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const hadlerSetGood = () => {
    const counter = good + 1
    setGood(counter)

  }
  const hadlerSetNeutral = () => {
    const counter = neutral + 1
    setNeutral(counter)

  }
  const hadlerSetBad = () => {
    const counter = bad + 1
    setBad(counter)

  }

  return (
    <div>
      <Title text={'Give Feedback'} />
      <Button onClick={hadlerSetGood} text={'Good'} />
      <Button onClick={hadlerSetNeutral} text={'Neutral'} />
      <Button onClick={hadlerSetBad} text={'bad'} />
      <Title text={'Statisics'} />
      <Display goodValue={`Good ${good}`} neutralValue={`Neutral ${neutral}`} badValue={`Bad ${bad}`} />
      <br />
    </div>
  )
}

export default App

