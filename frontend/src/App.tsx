import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './COMPONENTS/HomePage'
import { Konva1 } from './ALGORITHMS/SORT/BUBBLE_SORT/konva1'
import KonvaContainer from './TEST_SITE/konvaContainer'
import Layout from './TEST_SITE/layout'
import BubbleSort from './ALGORITHMS/SORT/BUBBLE_SORT/BubbleSort'
import { ToastContainer } from 'react-toastify'
import MergeSort from './ALGORITHMS/SORT/MERGE_SORT/MergeSort'
import AdminLogin from './ADMIN/Login'
import { authStore } from './STATE/authStore'
import QuickSort from './ALGORITHMS/SORT/QUICK_SORT/QuickSort'
import RollingButtons from './TEST_SITE/RollingButtons'
import InsertionSort from './ALGORITHMS/SORT/INSERTION_SORT/InsertionSort'



function App() {

  const clickCount = authStore((state) => state.clickCount);

  const CheckAuth = authStore((state) => state.CheckAuth);
  const Admin = authStore((state) => state.Admin);


  //console.log("Admin : ", Admin);

  useEffect(() => {
    CheckAuth();
  }, []);



  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/layout' element={<Layout />} />
        <Route path='/sort/bubble' element={<BubbleSort />} />
        <Route path='/sort/merge' element={<MergeSort />} />
        <Route path='/sort/quick' element={<QuickSort />} />
        <Route path='/sort/insertion' element={<InsertionSort />} />


        <Route path='/secret/login' element={clickCount != 13 ? <Navigate to="/" replace /> : <AdminLogin />} />








      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App
