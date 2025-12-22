import { useState } from "react";

export const useField = (type) => {
    const [value, setValue] = useState('')

    const clean = () => {
        setValue('')
    }

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        other: { clean },
        type,
        value,
        onChange,

    }
}
