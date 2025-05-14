import Phone from '../services/Phone'

const Button = ({ onClick }) => {
    return <button onClick={onClick}>delete</button>
}

const Numbers = ({ people, input, setPerson }) => {

    const filteredPerson = people.filter((person) => {
        if (input === '') {
            return people;
        }
        else {
            return person.name.toLowerCase().includes(input)
        }
    })

    const handleRemove = (id, name) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            Phone.deletePhone(id).then(() => {
                const remainingList = people.filter(person => person.id !== id)
                setPerson(remainingList)
            })
        }
    }

    return (
        <ul>
            {
                filteredPerson.map((item) => (
                    <li key={item.id}>{item.name} {item.number} <Button onClick={() => handleRemove(item.id, item.name)} /> </li>
                ))
            }
        </ul>
    )
}
export default Numbers