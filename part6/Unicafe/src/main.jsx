import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import './index.css'
import App from './App.jsx'
import reducer from './reducers/counterReducer.js'

/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/

const store = createStore(reducer.counterReducer)
const root = createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<StrictMode>
    <App store={store} />
  </StrictMode>)
}

renderApp()
store.subscribe(renderApp)

