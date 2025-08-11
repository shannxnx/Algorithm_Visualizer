import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './COMPONENTS/HomePage'
import { Konva1 } from './TEST_SITE/konva1'
import KonvaContainer from './TEST_SITE/konvaContainer'
import Layout from './TEST_SITE/layout'
import BubbleSort from './ALGORITHMS/SORT/BubbleSort'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />


        <Route path='/test-konva' element={<KonvaContainer />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='/sort/bubble' element={<BubbleSort />} />


      </Routes>
    </BrowserRouter>

  )
}

export default App
