import axios from "axios";
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newObject, config)

}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default {
    setToken,
    getAll,
    create,
    update
}