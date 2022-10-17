import React , {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import SettingsPage from '../pages/SettingsPage';
import Deneme from '../pages/Deneme';
import PanelsPage from '../pages/PanelsPage';

import RouterDeneme from '../deneme/router-deneme';
import Users from '../deneme/Users';
import User from '../deneme/User';

import Collections from "../components/Collections";
import Workspace from "../components/Workspace";


export default function AllRoutes() {

  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];

  const [collections, setCollections] = useState([]); //? Workspacede ki tüm koleksiyon vs çekmek için

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage collections={collections} setCollections={setCollections} />}>
          <Route index={true} element={<Workspace />} /> //?Dışına bir layout oluşturduk ve içerisindekilerin değişmsini istiyoruz. Bu yüzden ilk tüm koleksiyon görünümümne index vermek istiyorum
          <Route path=":colID" element={<User />} />
        </Route>

        <Route path="/ayarlar" element={<SettingsPage />} />
        <Route path="/grafik-tablo" element={<PanelsPage />} />
        <Route path="/deneme" element={<Deneme />} />



        {/* <Route path="/router-deneme" element={<RouterDeneme />}> */}
          <Route path="users" element={<Users users={users} />}>
            <Route path=":userId" element={<User />} />
          </Route>
        {/* </Route> */}

      </Routes>
    </BrowserRouter>

  )
}
