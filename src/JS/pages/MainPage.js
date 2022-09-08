import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';

export default function MainPage() {
  return (
    <div>
        <Navbar />
        <Sidebar />
        <Filepath />
    </div>
  )
}
