import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import DataModal from '../components/DataModal';
import DragResizePanels from '../components/DragResizePanels';

export default function ChartLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-20 pb-10">
        <DataModal />
        <DragResizePanels />
      </div>
    </>
  )
}
