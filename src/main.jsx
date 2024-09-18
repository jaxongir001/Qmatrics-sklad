import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Routes } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <Routes>
    <App />
  </Routes>,
)
