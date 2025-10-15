const PersonForm = ({ personName, newPhone, setNewName, setNewPhone, addPerson }) => {

    const hadleName = (event) => {
        setNewName(event.target.value)
    }

    const hadlePhone = (event) => {
        setNewPhone(event.target.value)
    }



    return (
        <fieldset>
            <legend><strong>Phonebook form</strong></legend>
            <form onSubmit={addPerson}>
                <label >
                    <strong>*</strong>name: <input id='name' value={personName} onChange={hadleName} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
                </label>
                <div>
                    <label>
                        <strong>*</strong>Phone:<input type='text' id='phone' value={newPhone} onChange={hadlePhone} minLength={9} maxLength={14} placeholder='E.g 320-1233214' required />
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