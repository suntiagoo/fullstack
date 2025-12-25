import { useState, useEffect } from "react";
import axios from 'axios'


export const useResource = (baseUrl) => {

    const [resorce, setResource] = useState([])

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await getAll(baseUrl)
            setResource(blogs.data)
        }
        getBlogs()

    }, [])

    let token = null

    const setToken = newToken => {
        token = `Bearer ${newToken}`
    }

    const getAll = () => {
        return axios.get(baseUrl)
    }

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: token },
        }
        const result = await axios.post(baseUrl, newObject, config)
        setResource([...resorce, result.data])
        return result
    }

    return [resorce, { create, setToken }]

}



