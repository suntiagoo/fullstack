
import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {

    const [value, setValue] = useState('')

    const onChange = (data) => {
        setValue(data)
    }

    return { type, value, onChange }
}

export const useResource = (baseUrl) => {

    const [person, setPerson] = useState([])

    useEffect(() => {
        const getPersons = async () => {
            const response = await getAll(baseUrl)
            setPerson(response.data)
        }
        getPersons()
    }, [])

    const getAll = (baseUrl) => {
        return axios.get(baseUrl)
    }




    const create = async (data) => {
        const response = await axios.post(baseUrl, data)
        setPerson([...person, response.data])
    }

    return [person, create]


}
