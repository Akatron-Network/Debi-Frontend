import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import Collections from '../components/Collections';
import DragResizePanels from '../components/DragResizePanels'

export default function MainPage() {
  return (
    <div>
        <Navbar />
        <Sidebar />
        <Filepath />
        <Collections />
        <DragResizePanels />
    </div>
  )
}
