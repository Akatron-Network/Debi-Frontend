import React , { useState , useEffect, useRef } from 'react'
import { MainContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DragResizePanels from '../components/DragResizePanels'


export default function MainPage() {


  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const getColWorks = async () => {
    let resp = await WorkspaceAll.getCollections();
    setCollections(resp.Data.owned_collections);
  }
  
  const getFolderWorks = async () => {
    let resp = await WorkspaceAll.getFolders();
    setFolders(resp.Data.owned_directories);
  }

  const getFileWorks = async () => {
    let resp = await WorkspaceAll.getFiles();
    setFiles(resp.Data.owned_pages);
  }
    
  const worksNameRef = useRef(null);
	const [type, setType] = useState('');

	const addWorks = (type) => {
		data.worksNameRef.current.value = "";
		setType(type);
	}

  const data = {
    collections,
    folders,
    files,
    worksNameRef,
    type,
    addWorks,
    getColWorks,
    getFolderWorks,
    getFileWorks,
  }

  return (
    <MainContext.Provider value={data}>
      <Navbar />
      <Sidebar />
      <Filepath />

      <div className="pt-[89px] pb-10 pl-[100px] pr-[38px]">
        <Outlet />
      </div>
    </MainContext.Provider >
  )
}
