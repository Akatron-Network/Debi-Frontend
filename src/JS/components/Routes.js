import React , {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import SettingsPage from '../pages/SettingsPage';
import Deneme from '../pages/Deneme';
import PanelsPage from '../pages/PanelsPage';
import ColSpace from "../components/ColSpace";
import FoldSpace from "../components/FoldSpace";
import FileSpace from "../components/FileSpace";

import RouterDeneme from '../deneme/router-deneme';
import Users from '../deneme/Users';
import User from '../deneme/User';


export default function AllRoutes() {

  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />

        <Route path="/" element={<MainPage />}>
          <Route index={true} element={<ColSpace />} />
          <Route path=":colID" element={<FoldSpace />} />
          <Route path=":foldID" element={<FileSpace />} />
        </Route>

        <Route path="/ayarlar" element={<SettingsPage />} />
        <Route path="/grafik-tablo" element={<PanelsPage />} />
        <Route path="/deneme" element={<Deneme />} />



        <Route path="/router-deneme" element={<RouterDeneme />}>
          <Route path="users" element={<Users users={users} />}>
            <Route path=":userId" element={<User />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>

  )
}
