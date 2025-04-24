import { useState } from 'react'
import './App.css'

const Title = ({ text }) => <h3 >{text}</h3>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const DisplayFeedback = ({ goodValue, neutralValue, badValue }) => {
  return (
    <ul>
      <li>{goodValue}</li>
      <li>{neutralValue}</li>
      <li>{badValue}</li>

    </ul>
  )
}

const Statisics = ({ total, average, positive }) => {
  return (
    <ul>
      <li>{total}</li>
      <li>{average}</li>
      <li>{positive}</li>
    </ul>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const hadlerSetGood = () => {
    const counter = good + 1
    const auxTotal = counter + bad + neutral
    const auxAverage = Math.abs((counter + (bad * -1)) / auxTotal)
    const auxPositive = (counter * 100) / auxTotal
    setGood(counter)
    setTotal(counter + bad + neutral)
    setAverage(auxAverage)
    setPositive(auxPositive)
  }

  const hadlerSetNeutral = () => {
    const counter = neutral + 1
    const auxTotal = counter + bad + good
    const auxAverage = Math.abs((good + (bad * -1)) / auxTotal)
    const auxPositive = (good * 100) / auxTotal
    setNeutral(counter)
    setTotal(counter + good + bad)
    setAverage(auxAverage)
    setPositive(auxPositive)
  }

  const hadlerSetBad = () => {
    const counter = bad + 1
    const auxTotal = counter + good + neutral
    const auxAverage = Math.abs((good + (counter * -1)) / auxTotal)
    const auxPositive = (good * 100) / auxTotal
    setBad(counter)
    setTotal(counter + good + neutral)
    setAverage(auxAverage)
    setPositive(auxPositive)
  }
  return (
    <div>
      <Title text={'Give Feedback'} />
      <Button onClick={hadlerSetGood} text={'Good'} />
      <Button onClick={hadlerSetNeutral} text={'Neutral'} />
      <Button onClick={hadlerSetBad} text={'bad'} />
      <Title text={'Statisics'} />
      <DisplayFeedback goodValue={`Good ${good}`} neutralValue={`Neutral ${neutral}`} badValue={`Bad ${bad}`} />
      <Statisics total={`All ${total}`} average={`Average ${average}`} positive={`Positive ${positive}%`} />
    </div>
  )
}

export default App

