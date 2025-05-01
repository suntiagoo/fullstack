const Numbers = ({ people, input }) => {

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

export default Numbers