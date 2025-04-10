import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChatAppContext } from './Service/ChatAppContext.jsx'

createRoot(document.getElementById('root')).render(
  <ChatAppContext>
    <App />
  </ChatAppContext>,
)
