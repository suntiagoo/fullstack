import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getCountry } from './request'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    const countryFetch = async () => {
      try {
        if (name === '') {
          setCountry(null)
        } else if (name.length > 0) {
          const aux = await getCountry(name)
          setCountry({ ...aux, found: true })
        }
      }
      catch (exception) {
        if (Number(exception?.response?.status) === 404) {
          setCountry({ found: false })
          console.log(exception)
        }
      }
    }
    countryFetch()
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log(country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App