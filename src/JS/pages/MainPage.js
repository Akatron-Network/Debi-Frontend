import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DragResizePanels from '../components/DragResizePanels'
import { Outlet } from 'react-router-dom';

export default function MainPage() {

  return (
    <div>
        <Navbar />
        <Sidebar />
        <Filepath />

        <div className="pt-[89px] pb-10 pl-[100px] pr-[38px]">
          <Outlet />
        </div>
    </div>
  )
}
