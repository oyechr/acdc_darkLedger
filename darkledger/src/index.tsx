import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DarkLedger } from './components/DarkLedger'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <DarkLedger />
  </React.StrictMode>
)
