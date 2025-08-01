import { useEffect, useState } from "react"
import CountryData from "./component/ViewCountryData"
import Country from './server/Country'
import Weather from "./server/Weather"
import Search from "./component/Search"


const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountry] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [item, setItem] = useState(0)
  const [weather, setWeather] = useState(null)


  const handleSearch = (event) => {
    setInput(event.target.value)
    if (event.target.value === '' && isClick == true) {
      setIsClick(!isClick)
    }
  }

  const handleViewInformation = (item) => {
    setIsClick(!isClick)
    setItem(item)
  }

  useEffect(() => {
    let aux = []
    if (input) {
      const fetchContryData = async () => {
        try {
          const { data } = await Country.getCountry();
          setCountry(data);
          aux = countries.filter((country) => country.name.common.includes(input));
          if (aux.length == 1) {
            //console.log(countries.filter((country) => country.name.common.includes(input))[0].capital[0].toLowerCase())
            const { data } = await Weather.getCityWeather(countries.filter((country) => country.name.common.includes(input))[0].capital[0].toLowerCase());
            //console.log([data][0].main.temp)
            setWeather([data])

          }
        } catch (err) {
          console.log(err)
        }
      }
      fetchContryData();
    }

  }, [input])




  return (
    <>
      <Search onChange={handleSearch} value={input} />
      {<CountryData countryData={countries} type={input} onClick={handleViewInformation} isClick={isClick} item={item} weather={weather} />}
    </>
  )
}

export default App
