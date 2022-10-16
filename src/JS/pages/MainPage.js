import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import Workspace from '../components/Workspace';
import DragResizePanels from '../components/DragResizePanels'

export default function MainPage() {
  return (
    <div>
        <Navbar />
        <Sidebar />
        <Filepath />
        <Workspace />
    </div>
  )
}
