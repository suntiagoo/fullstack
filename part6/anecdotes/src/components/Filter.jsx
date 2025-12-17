import { filter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const result = event.target.value
        dispatch(filter(result))

        // input-field value is in variable event.target.value
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter