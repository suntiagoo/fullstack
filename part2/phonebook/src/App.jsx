import { useState } from 'react'

const Person = ({ people }) => {
  return (
    <ul>
      {people.map(person => <li key={person.id}> {person.name} {person.phone} </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    phone: '05154678945',
    id: 1
  }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const hadleName = (event) => {
    setNewName(event.target.value)
  }

  const hadlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    }
    persons.find(person => person.name === newName) === undefined ? setPersons(persons.concat(person)) : alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <fieldset >
        <legend><strong>Phonebook form</strong></legend>
        <form onSubmit={addPerson}>
          <label >
            name:<strong>*</strong><input id='name' value={newName} onChange={hadleName} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
          </label>
          <div>
            <label>
              Phone: <strong>*</strong> <input id='phone' value={newPhone} onChange={hadlePhone} minLength={7} maxLength={10} placeholder='E.g 0520599563' required />
            </label>
          </div>
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
