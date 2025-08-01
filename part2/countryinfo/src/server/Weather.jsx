import axios from "axios"
// example of url: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = import.meta.env.VITE_API_KEY
const getCityWeather = (capital) => {
    return axios.get(`${weatherUrl}${capital}&appid=${key}&units=metric`)
}

export default {
    getCityWeather
}