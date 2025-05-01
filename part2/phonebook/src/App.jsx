import { useState } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'



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



  const handleFilterName = (event) => {
    setFilter(event.target.value.toLowerCase())
  }



  return (
    <div>
      <h2>Phonebook </h2>
      <label>
        Filter shown with <input type='search' id='filter' name='filter' value={filter} onChange={handleFilterName} minLength={1} maxLength={20} placeholder='E.g Olga' />
      </label>
      <h2>Add new </h2>
      <PersonForm listPersons={persons} PersonName={newName} newPhone={newPhone} setPersons={setPersons} setNewName={setNewName} setNewPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Numbers people={persons} input={filter} />
    </div>
  )
}

export default App
