import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DataModal from "./datamodal/DataModal";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import SettingsPage from "../pages/SettingsPage";
import ChartLayout from "../pages/ChartLayout";
import PanelsPage from "../pages/PanelsPage";
import Collections from "./workspace/Collections";
import Folders from "./workspace/Folders";
import Files from "./workspace/Files";
import Deneme from "../pages/Deneme";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          <Route index={true} element={<Collections />} />
          <Route path=":colID" element={<Folders />} />
          <Route path=":colID/:foldID" element={<Files />} />
          <Route path=":colID/:foldID/:fileID" element={<ChartLayout />} />
        </Route>
        <Route path="/ayarlar" element={<SettingsPage />} />
        <Route path="/grafik-tablo" element={<PanelsPage />} />
        <Route path="/deneme" element={<Deneme />} />
      </Routes>
    </BrowserRouter>
  );
}
