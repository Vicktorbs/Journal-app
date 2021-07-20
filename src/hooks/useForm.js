import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState)
    }

    const handleInoutChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInoutChange, reset]
}