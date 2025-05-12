import axios from "axios"



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
                    name:<strong>*</strong><input type='tel' id='name' value={personName} onChange={hadleName} minLength={2} maxLength={20} placeholder='E.g Bob Muller' required />
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