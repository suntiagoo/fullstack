import axios from 'axios'

const contryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = () => {
    //return axios.get(`${contryUrl}/{${name}}`)
    //return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/finland`)
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}

export default {
    getCountry
}