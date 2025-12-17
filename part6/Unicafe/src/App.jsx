
import './App.css'

const Title = ({ text }) => <h2 >{text}</h2>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ StatisticName, StatisticValue }) => {
  return (
    <tr>
      <td>{StatisticName}</td>
      <td>{StatisticValue}</td>
    </tr>
  )
}

const Statistics = ({ goodValue, neutralValue, badValue, total, average, positive }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>StatisticName</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine StatisticName={'Good'} StatisticValue={goodValue} />
        <StatisticLine StatisticName={'Neutral'} StatisticValue={neutralValue} />
        <StatisticLine StatisticName={'Bad'} StatisticValue={badValue} />
        <StatisticLine StatisticName={'All'} StatisticValue={total} />
        <StatisticLine StatisticName={'Average'} StatisticValue={average} />
        <StatisticLine StatisticName={'Positive'} StatisticValue={`${positive}%`} />
      </tbody>
    </table>
  )
}

const App = ({ store }) => {

  const handleStatistic = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'TOTAL' })
    store.dispatch({ type: 'AVERAGE' })
    store.dispatch({ type: 'POSITIVE' })
  }


  const handleButtonGood = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'GOOD' })
    handleStatistic()
  }
  const handleButtonOk = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'OK' })
    handleStatistic()
  }

  const handleButtonBad = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'BAD' })
    handleStatistic()
  }


  return (
    <div>


      <Button onClick={handleButtonGood} text={'Good'} />
      <Button onClick={handleButtonOk} text={'Neutral'} />
      <Button onClick={handleButtonBad} text={'bad'} />
      <Title text={'Statisics'} />
      <Statistics goodValue={store.getState().good} neutralValue={store.getState().ok} badValue={store.getState().bad} total={store.getState().total} average={store.getState().average} positive={store.getState().positive} />
    </div>
  )
}
export default App
