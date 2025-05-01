const PersonForm = ({ listPersons, PersonName, newPhone, setPersons, setNewName, setNewPhone }) => {

    const hadleName = (event) => {
        setNewName(event.target.value)
    }

    const hadlePhone = (event) => {
        setNewPhone(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const person = {
            name: PersonName,
            phone: newPhone,
            id: listPersons.length + 1,
        }
        listPersons.find(person => person.name === PersonName) === undefined ? setPersons(listPersons.concat(person)) + alert(`${PersonName} was adding to phonebook`) : alert(`${PersonName} is already added to phonebook`)
        setNewName('')
        setNewPhone('')
    }

    return (
        <fieldset >
            <legend><strong>Phonebook form</strong></legend>
            <form onSubmit={addPerson}>
                <label >
                    name:<strong>*</strong><input type='tel' id='name' value={PersonName} onChange={hadleName} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
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
    )
}
export default PersonForm