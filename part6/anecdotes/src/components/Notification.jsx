import { useSelector } from 'react-redux'

const Notification = () => {
    let notification = useSelector(state => state.notification)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    setTimeout(() => { notification = null }, 2000)
    return (
        <div style={style}>
            {notification && notification}
        </div>
    )
}

export default Notification