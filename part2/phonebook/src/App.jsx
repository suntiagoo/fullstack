import { useState } from 'react'

const Person = ({ people, input }) => {

  const filteredPerson = people.filter((person) => {
    if (input === '') {
      return people;
    }
    else {
      return person.name.toLowerCase().includes(input)
    }

  })

  return (
    <ul>
      {filteredPerson.map((item) => (
        <li key={item.id}>{item.name} {item.phone}</li>
      ))}
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
  const [filter, setFilter] = useState('')

  const hadleName = (event) => {
    setNewName(event.target.value)
  }

  const hadlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    }
    persons.find(person => person.name === newName) === undefined ? setPersons(persons.concat(person)) + alert(`${newName} was adding to phonebook`) : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook </h2>
      <label>
        Filter shown with <input type='search' id='filter' name='filter' value={filter} onChange={handleFilterName} minLength={1} maxLength={20} placeholder='E.g Olga' />
      </label>
      <h2>Add new </h2>
      <fieldset >
        <legend><strong>Phonebook form</strong></legend>
        <form onSubmit={addPerson}>
          <label >
            name:<strong>*</strong><input type='tel' id='name' value={newName} onChange={hadleName} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
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
      <Person people={persons} input={filter} />
    </div>
  )
}

export default App
