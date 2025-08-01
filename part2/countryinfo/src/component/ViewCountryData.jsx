import InformationWeather from "./Weather"

const ShowCompletInformation = ({ data, index, weather }) => {
    return (
        <>
            <fieldset>
                <legend>{`information of country`}</legend>
                <h2>{data[index].name.common}</h2>
                <a>{`Capital: ${data[index].capital.map(capital => ` ${capital}`)}`}</a>
                <div>{`Area: ${data[index].area.toString()}`}</div>
                <h3>languages</h3>
                {Object.values(data[index].languages).map(language => <li key={language}>{language}</li>)}
                <div> <img key={data[index].flags.png} src={data[index].flags.png} alt={data[index].flags.alt} width={200} height={100} /> </div>
            </fieldset>
            {<InformationWeather weather={weather} />}
        </>
    )
}
const ViewCountryData = ({ onClick, countryData, type, isClick, item, weather }) => {
    const countryMatch = countryData.filter((country) => country.name.common.includes(type))
    if (!countryMatch.length || countryMatch.length > 10) {
        return (<p>to many matches, specify another filter</p>)
    } else if (countryMatch.length > 1 && countryMatch.length < 10) {
        const aux = countryMatch.map((country, item) => <p key={country.name.common}> {country.name.common} {<button onClick={() => onClick(item)}>show</button>}</p>)
        return isClick ? <ShowCompletInformation data={countryMatch} index={item} weather={weather} /> : aux
    } else if (countryMatch.length == 1)
        return <ShowCompletInformation data={countryMatch} index={0} weather={weather} />
}

export default ViewCountryData