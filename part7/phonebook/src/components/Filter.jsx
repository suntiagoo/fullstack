const Filter = ({ filter, setFilter }) => {

    const handleFilterName = (event) => {
        setFilter(event.target.value.toLowerCase())
    }

    return (
        <>
            <h2>Phonebook </h2>
            <label>
                Filter shown with <input type='search' id='filter' name='filter' value={filter} onChange={handleFilterName} minLength={1} maxLength={20} placeholder='E.g Olga' />
            </label>
        </>

    )
}


export default Filter