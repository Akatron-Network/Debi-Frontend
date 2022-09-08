import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/LoginPage';
import MainPage from '../pages/MainPage';

export default function AllRoutes() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>

  )
}
