
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

const ShowCompletInformation = ({ data, index }) => {
    return (
        <>
            <fieldset>
                <legend>{`information of country`}</legend>
                {/*countryMatch.map((country) => <h2 key={country.name.common}> {country.name.common} </h2>)*/}
                <h2>{data[index].name.common}</h2>
                {/*<Capital country={countryMatch} />*/}
                <a>{`Capital: ${data[index].capital.map(capital => ` ${capital}`)}`}</a>
                {/*<div>{countryMatch.map((country) => <a key={country.name.common} > {`Area: ${country.area.toString()}`} </a>)}</div>*/}
                <div>{`Area: ${data[index].area.toString()}`}</div>
                <h3>languages</h3>
                {/*<Languages country={countryMatch} />*/}
                {Object.values(data[index].languages).map(language => <li key={language}>{language}</li>)}
                {/*<div>{countryMatch.map(country => <img key={country.flags.png} src={country.flags.png} alt={country.flags.alt} />)}</div>*/}
                <div> <img key={data[index].flags.png} src={data[index].flags.png} alt={data[index].flags.alt} /> </div>
            </fieldset>
        </>
    )
}
const CountryData = ({ onClick, countryData, type, isClick, item }) => {
    const countryMatch = countryData.filter((country) => country.name.common.includes(type))
    if (countryMatch.length > 10) {
        return (<p>to many matches, specify another filter</p>)
        //else if ( 1 < countryMatch.length < 10 )
        //else if(countryMatch.length in range (2, 11))
    } else if (countryMatch.length > 1 && countryMatch.length < 10) {
        const aux = countryMatch.map((country, item) => <p key={country.name.common}> {country.name.common} {<button onClick={() => onClick(item)}>{item}</button>}</p>)
        //Se puede poner un operador ternario - cuando el botton se preciona coloca en ok y si es ok entonces muestra todos los datos del pais sino, entonces muestra solo los nombres
        return isClick ? <ShowCompletInformation data={countryMatch} index={item} /> : aux
    } else if (countryMatch.length == 1)
        return (<ShowCompletInformation data={countryMatch} index={0} />)
}

export default CountryData