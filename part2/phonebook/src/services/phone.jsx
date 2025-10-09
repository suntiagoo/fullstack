import axios from "axios";
const dataUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(dataUrl)
}

const create = (newPhone) => {
    return axios.post(dataUrl, newPhone)
}

const update = (id, number) => {
    return axios.put(`${dataUrl}/${id}`, number)
}

const deletePhone = (id) => {
    return axios.delete(`${dataUrl}/${id}`)
}

export default
    {
        getAll,
        create,
        update,
        deletePhone
    }