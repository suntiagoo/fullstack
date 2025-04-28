import { useState } from 'react'


const Person = ({ people }) => {
  return (
    <ul>
      {people.map(person => <li key={person.id}>{person.name}</li>)}
    </ul>

  )
}

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    id: 1
  }
  ])
  const [newName, setNewName] = useState('')

  const hadleAddPerson = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = () => {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2> Phonebook</h2>
      <fieldset >
        <legend><strong>Phonebook form</strong></legend>
        <form onSubmit={addPerson}>
          <label >
            name:<strong>*</strong><input id='name' value={newName} onChange={hadleAddPerson} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
          </label>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </fieldset>

      <h2>Numbers</h2>
      <Person people={persons} />
    </div>
  )
}

export default App
