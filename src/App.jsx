import { useState } from 'react'
import './App.css'
import Container from './Container/Container'
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
  <Container />
  </BrowserRouter>
    </>
  )
}

export default App
