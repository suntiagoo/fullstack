import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Phone from './services/Phone'

const App = () => {

  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Phone
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const person = { name, number }
    const isRepeated = persons.find(person => person.name === name) === undefined ? false : true

    if (!isRepeated) {
      Phone.create(person).then(response => { setPersons(persons.concat(response.data)) })
    }
    else {
      if (confirm(`${name} is already added to phonebook, remplace the old number with a new one?`)) {
        const { id } = persons.find(person => person.name === name)
        Phone.update(id, { name: name, number: number }).then(response => {
          const aux = persons.filter(person => person.id !== id)
          setPersons(aux.concat(response.data))
        })
      }
    }
    setPersons(persons)
    setName('')
    setNumber('')
  }
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new </h2>
      <PersonForm personName={name} newPhone={number} setNewName={setName} setNewPhone={setNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Numbers people={persons} input={filter} setPerson={setPersons} />
    </div>
  )
}
export default App
