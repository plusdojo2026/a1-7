import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Chart from './components/Chart'
import Calendar from './components/Calendar'
import Login from './components/Login'
import ProductRegister from './components/ProductRegister'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
return (
<>
<section id="center">
<BrowserRouter>
<Routes>
<Route index element={<Login />} ></Route>
    <Route path="/Chart" element={<Chart  />} ></Route>
    <Route path="/Calendar" element={<Calendar />} ></Route>
    <Route path="ProductRegister" element={<ProductRegister />} ></Route>
    
</Routes>
</BrowserRouter>
</section>
</>
);
}
export default App