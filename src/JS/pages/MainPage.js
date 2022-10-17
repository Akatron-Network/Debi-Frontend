import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import Workspace from '../components/Workspace';
import WorkspaceLayout from '../components/WorkspaceLayout';
import DragResizePanels from '../components/DragResizePanels'
import { Outlet } from 'react-router-dom';

export default function MainPage({ setCollections , collections }) {

  return (
    <div>
        <Navbar />
        <Sidebar />
        <Filepath />
        <WorkspaceLayout collections={collections} setCollections={setCollections} />
    </div>
  )
}
