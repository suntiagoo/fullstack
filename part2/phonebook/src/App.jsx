import { useState } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



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




  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new </h2>
      <PersonForm listPersons={persons} PersonName={newName} newPhone={newPhone} setPersons={setPersons} setNewName={setNewName} setNewPhone={setNewPhone} />

      <h2>Numbers</h2>
      <Numbers people={persons} input={filter} />
    </div>
  )

}
export default App
