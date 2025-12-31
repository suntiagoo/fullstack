import axios from "axios";
const baseUrl = '/api/login'

const login = (credentials) => {
    return axios.post(baseUrl, credentials)
}

export default { login }