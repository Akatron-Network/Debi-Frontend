import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import SettingsPage from '../pages/SettingsPage';
import Deneme from '../pages/Deneme';

export default function AllRoutes() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/ayarlar" element={<SettingsPage />} />
        {/* <Route path="/deneme" element={<Deneme />} /> */}
      </Routes>
    </BrowserRouter>

  )
}
