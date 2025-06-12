const Search = ({ onChange, value }) => {
    return (
        <div>
            <form>
                <label>
                    Find countries: <input type="search" id='search' name='search' value={value.charAt(0).toUpperCase() + value.slice(1)} placeholder="E.g japan" onChange={onChange}></input>
                </label>
            </form>
        </div>
    )
}

export default Search