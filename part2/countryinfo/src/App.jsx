import { useEffect, useState } from "react"
import CountryData from "./component/ViewCountryData"
import Country from './server/Country'
import Search from "./component/Search"

const App = () => {

  const [input, setInput] = useState('')
  const [countries, setConuntry] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [item, setItem] = useState(0)

  const handleSearch = (event) => {
    console.log(event)
    setInput(event.target.value)
    let previousValue = '';
    if (event.target.value === '') {
      setIsClick(!isClick)
    }
    previousValue = event.target.value;
    console.log(previousValue)
  }

  const handleViewInformation = (ite) => {
    setIsClick(!isClick)
    setItem(ite)
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
      <CountryData countryData={countries} type={input} onClick={handleViewInformation} isClick={isClick} item={item} />
    </>
  )
}

export default App
