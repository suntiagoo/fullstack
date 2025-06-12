import { useEffect, useState } from "react"
import CountryData from "./component/CountryData"
import Country from './server/Country'
import Search from "./component/Search"

const App = () => {

  const [input, setInput] = useState('')
  const [countries, setConuntry] = useState([])

  const handleSearch = (event) => {
    setInput(event.target.value)
  }

  useEffect((input) => {
    if (countries) {
      Country.getCountry(input).then(response => {
        setConuntry(response.data)

      }).catch(error => { console.log('this is the error', error) })
    }
  }, [input])

  return (
    <>
      <Search onChange={handleSearch} value={input} />
      <CountryData countryData={countries} type={input} />
    </>
  )
}

export default App
