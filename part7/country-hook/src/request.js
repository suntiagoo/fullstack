import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

/*export const getCountry = async (name) => {

    const response = await fetch(`${baseUrl}/${name}`)

    if (!response.ok) {
        throw new Error('Failed to fetch Anecdotes')
    }
    return await response.json()
}
    */

export const getCountry = (name) => {
    return axios.get(`${baseUrl}/${name}`)
}

