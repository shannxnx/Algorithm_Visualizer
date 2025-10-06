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
import SelectionSort from './ALGORITHMS/SORT/SELECTION_SORT/SelectionSort'
import BinarySearch from './ALGORITHMS/SEARCH/BINARY_SEARCH/BinarySearch'
import LinearSearch from './ALGORITHMS/SEARCH/LINEAR_SEARCH/LinearSearch'
import InterpolationSearch from './ALGORITHMS/SEARCH/INTERPOLATION_SEARCH/InterpolationSearch'
import JumpSearch from './ALGORITHMS/SEARCH/JUMP_SEARCH/JumpSearch'
import ExponentialSearch from './ALGORITHMS/SEARCH/EXPONENTIAL_SEARCH/ExponentialSearch'
import TernarySearch from './ALGORITHMS/SEARCH/TERNARY_SEARCH/TernarySearch'




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
        <Route path='/sort/selection' element={<SelectionSort />} />


        <Route path='/search/binary' element={<BinarySearch />} />
        <Route path='/search/linear' element={<LinearSearch />} />
        <Route path='/search/interpolation' element={<InterpolationSearch />} />
        <Route path='/search/jump' element={<JumpSearch />} />
        <Route path='/search/exponential' element={<ExponentialSearch />} />
        <Route path='/search/ternary' element={<TernarySearch />} />

        <Route path='/secret/login' element={clickCount != 13 ? <Navigate to="/" replace /> : <AdminLogin />} />








      </Routes>
      <ToastContainer />
    </BrowserRouter>

  )
}

export default App
