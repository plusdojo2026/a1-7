import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Chart from './components/Chart'
import Calendar from './components/Calendar'
import Login from './components/Login'
import Register from './components/Register'
import ProductSearch from './components/ProductSearch'
import Mypage from './components/Mypage'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductSorting from './components/ProductSorting'

function App() {
    return (
        <>
            <section id="center">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login />} ></Route>
                        <Route path="/Register" element={<Register />} ></Route>
                        <Route path="/Chart" element={<Chart />} ></Route>
                        <Route path="/Calendar" element={<Calendar />} ></Route>
                        <Route path="ProductSearch" element={<ProductSearch />} ></Route>
                        <Route path="/ProductSorting" element={<ProductSorting />} ></Route>
                        <Route path="/Mypage" element={<Mypage />} ></Route>
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    );
}
export default App