import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {Provider} from "react-redux";
// import store from "./redux/store";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
