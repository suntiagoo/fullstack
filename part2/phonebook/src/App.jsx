import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Phone from './services/Phone'
import Notification from './components/Notification'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    Phone
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  //console.log(persons)
  const addPerson = (event) => {
    event.preventDefault()
    const person = { name, phone }
    const isRepeated = persons.find(person => person.name === name) === undefined ? false : true



    if (!isRepeated) {
      Phone.create(person).then(response => {
        setPersons(persons.concat(response.data))
        setErrorMessage(`${name} was registered on our server`)
      }).
        catch(error => {
          console.log('error:', error.response.data.error)
          setErrorMessage(`${error.response.data.error}`)
        })
    }
    else {
      if (confirm(`${name} is already added to phonebook, remplace the old phone with a new one?`)) {

        const { id } = persons.find(person => person.name === name)
        Phone.update(id, { name, phone }).then(response => {
          const aux = persons.filter(person => person.id !== id)
          setPersons(aux.concat(response.data))
          setErrorMessage(`${name}'s number was successfully edited`)
        }).catch(error => {
          setErrorMessage(`error: ${error.response.data.error}`)
          console.error(`error  ${error.response.data.error}`)
        })
      }
    }
    setTimeout(() => { setErrorMessage(null) }, 5000)

    setName('')
    setPhone('')
    setPersons(persons)
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new </h2>
      <PersonForm personName={name} newPhone={phone} setNewName={setName} setNewPhone={setPhone} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Numbers people={persons} input={filter} setPerson={setPersons} />
    </div>
  )
}
export default App
