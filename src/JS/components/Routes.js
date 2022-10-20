import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import SettingsPage from '../pages/SettingsPage';
import Deneme from '../pages/Deneme';
import PanelsPage from '../pages/PanelsPage';
import Collections from "./Collections";
import Folders from "./Folders";
import Files from "./Files";

export default function AllRoutes() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          <Route index={true} element={<Collections />} />
          <Route path=":colID" element={<Folders />} />
          <Route path=":colID/:foldID" element={<Files />} />
        </Route>
        <Route path="/ayarlar" element={<SettingsPage />} />
        <Route path="/grafik-tablo" element={<PanelsPage />} />
        <Route path="/deneme" element={<Deneme />} />

      </Routes>
    </BrowserRouter>

  )
}
