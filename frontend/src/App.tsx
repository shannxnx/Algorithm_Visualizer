import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './COMPONENTS/HomePage'
import { Konva1 } from './TEST_SITE/konva1'
import KonvaContainer from './TEST_SITE/konvaContainer'
import Layout from './TEST_SITE/layout'
import BubbleSort from './ALGORITHMS/SORT/BubbleSort'
import { ToastContainer } from 'react-toastify'
import MergeSort from './ALGORITHMS/SORT/MergeSort'
import AdminLogin from './ADMIN/Login'

function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='/sort/bubble' element={<BubbleSort />} />
        <Route path='/sort/merge' element={<MergeSort />} />
        <Route path='/secret/login' element={<AdminLogin />} />


      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App
