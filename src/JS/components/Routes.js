import React from "react";
import { BrowserRouter, Routes, Route , useHistory} from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import SettingsPage from '../pages/SettingsPage';
import Deneme from '../pages/Deneme';
import PanelsPage from '../pages/PanelsPage';

export default function AllRoutes() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/ayarlar" element={<SettingsPage />} />
        <Route path="/grafik-tablo" element={<PanelsPage />} />
        <Route path="/deneme" element={<Deneme />} />
      </Routes>
    </BrowserRouter>

  )
}
