import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = { name, number }
    const isRepeated = persons.find(person => person.name === name) === undefined ? false : true

    if (!isRepeated) {
      axios.post('http://localhost:3001/persons', person).then(response => { setPersons(persons.concat(response.data)) })
    }
    else {
      alert(`${name} is already added to phonebook`)
      setPersons(persons)
    }
    setName('')
    setNumber('')

    //persons.find(person => person.name === name) !== undefined && alert(`${name} is already added to phonebook`)
    //const nonRepeatedPeople = persons.find(person => person.name === name) === undefined ? persons.concat(person) : persons
    //persons.find(person => person.name === newName) === undefined ? setPersons(persons.concat(person)) : alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new </h2>
      <PersonForm personName={name} newPhone={number} setNewName={setName} setNewPhone={setNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Numbers people={persons} input={filter} />
    </div>
  )
}
export default App
