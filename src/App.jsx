import { useState } from 'react'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import AddEvent from '../src/pages/AddEvent'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/Add' element={<AddEvent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
