
//const Capital = ({ country }) => {
//return (<p> {`capital: ${country.map(capital => capital)} `} </p>)
// return (<> {country.map(capital => <a key={capital}>{`Capital: ${capital}`}</a>)}</>)
//}

const Capital = ({ country }) => {
    return (
        <> {country.map(capital => <a key={capital}>{`Capital: ${capital.capital}`}</a>)}</>
    )
}

const Languages = ({ country }) => {
    return (
        <ul>
            {country.map(country => Object.values(country.languages).map(language => <li key={language}>{language}</li>))}
        </ul>
    )
}

const CountryData = ({ countryData, type }) => {
    const countryMatch = countryData.filter((country) => country.name.common.includes(type))
    if (countryMatch.length > 10) {
        return (<p>to many matches, specify another filter</p>)
        //else if ( 1 < countryMatch.length < 10 )
        //else if(countryMatch.length in range (2, 11))
    } else if (countryMatch.length > 1 && countryMatch.length < 10) {
        return countryMatch.map((country) => <p key={country.name.common}> {`country ${country.name.common} `} </p>)
    } else if (countryMatch.length == 1)
        return (
            <>
                <fieldset>
                    <legend>{`information of country`}</legend>
                    {countryMatch.map((country) => <h2 key={country.name.common}> {country.name.common} </h2>)}
                    <Capital country={countryMatch} />
                    <div>{countryMatch.map((country) => <a key={country.name.common} > {`Area: ${country.area.toString()}`} </a>)}</div>
                    <h3>languages</h3>
                    <Languages country={countryMatch} />
                    <div>{countryMatch.map(country => <img key={country.flags.png} src={country.flags.png} alt={country.flags.alt} />)}</div>
                </fieldset>
            </>
        )
}

export default CountryData