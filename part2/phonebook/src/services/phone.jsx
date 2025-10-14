import axios from "axios";
//const dataUrl = 'https://fullstack-part3-94om.onrender.com/api/persons'
const dataUrl = '/api/persons'


const getAll = () => {
    return axios.get(dataUrl)
}

const create = (newPhone) => {
    return axios.post(dataUrl, newPhone)
}

const update = (id, phone) => {
    return axios.put(`${dataUrl}/${id}`, phone)
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