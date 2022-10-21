import React , { useState , useRef } from 'react'
import { MainContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DragResizePanels from '../components/DragResizePanels'


export default function MainPage() {

  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState({directories: []});
  const [filesChildDirs, setFilesChildDirs] = useState({child_dirs: []});
  const [files, setFiles] = useState({pages: []});
  const [filepath, setFilePath] = useState([]);


  const getColWorks = async (col_id = undefined) => {
    let resp = await WorkspaceAll.getCollections(col_id);
    setCollections(resp.Data.owned_collections);
  }
  
  const getFolderWorks = async (col_id = undefined) => {
    let resp = await WorkspaceAll.getCollections(col_id);
    setFolders(resp.Data);
    setFilePath([{id: col_id, name: resp.Data.collection_name, url: "/" + col_id}]);
  }

	const getFileWorks = async (fold_id = undefined) => {
    let resp = await WorkspaceAll.getFolders(fold_id);
		setFilesChildDirs(resp.Data)
		setFiles(resp.Data)
		setFilePath(resp.Data.path)
  }

  const deleteItems = async (del_type , id) => {
    if(del_type === 'collection') {
      let resp = await WorkspaceAll.deleteCollections(id);
      console.log(resp)
      getColWorks();
    }
    else if(del_type === 'folder') {
      let resp = await WorkspaceAll.deleteFolders(id);
      console.log(resp)
    }
    else if(del_type === 'file') {
      let resp = await WorkspaceAll.deleteFiles(id);
      console.log(resp)
    }
    
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
    filesChildDirs,
    worksNameRef,
    type,
    filepath,
    setFilePath,
    addWorks,
    getColWorks,
    getFolderWorks,
    getFileWorks,
    deleteItems,
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
