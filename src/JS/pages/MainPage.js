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
  const [deleteItemRef, setDeleteItemRef] = useState({});
  const [deleteItemType, setDeleteItemType] = useState('');


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
      getColWorks();
    }
    else if(del_type === 'folder') {
      let resp = await WorkspaceAll.deleteFolders(id);

      if(resp.Data.parent_directory === null) {
        getFolderWorks(resp.Data.collection_id);
      }
      else {
        getFileWorks(resp.Data.parent_directory);
      }
    }
    else if(del_type === 'file') {
      let resp = await WorkspaceAll.deleteFiles(id);
      getFileWorks(resp.Data.directory_id);
    }
    
  }
    
  const colWorksNameRef = useRef({value : ""});
  const colWorksNickRef = useRef({value : ""});
  const colWorksPassRef = useRef({value : ""});
  const colWorksDBRef = useRef({value : ""});
  const colWorksSelectRef = useRef({value : ""});
  const colConnectorServerRef = useRef({value : ""});
  const colServerRef = useRef({value : ""});
  const colPortRef = useRef({value : ""});
  
  const colNameRef = useRef({value : ""});
  const foldNameRef = useRef({value : ""});
  const fileNameRef = useRef({value : ""});

  
  const [checkedConnector , setCheckedConnector] = useState(false);
  const [checkedExpress , setCheckedExpress] = useState(false);

  const clearRefs = (type) => {
    if(type === "koleksiyon") {
      data.colNameRef.current.value = "";
      data.colServerRef.current.value = "";
      data.colConnectorServerRef.current.value = "";
      data.colWorksNickRef.current.value = "";
      data.colWorksPassRef.current.value = "";
      data.colWorksDBRef.current.value = "";
      data.colWorksSelectRef.current.value = "default";
      data.colPortRef.current.value = "1433";

      if(checkedConnector) { setCheckedConnector(!checkedConnector) }
      if(checkedExpress) { setCheckedExpress(!checkedExpress) }

      if(document.getElementById('colWarn1').classList.contains('!block')) {
        document.getElementById('colWarn1').classList.remove('!block');
      }
      else if(document.getElementById('colWarn2').classList.contains('!block')) {
        document.getElementById('colWarn2').classList.remove('!block');
      }

    }
    else if(type === "klasör") {
      data.foldNameRef.current.value = "";
      if(document.getElementById('foldWarn').classList.contains('!block')) {
        document.getElementById('foldWarn').classList.remove('!block');
      }
    }
    else if(type === "sayfa") {
      data.fileNameRef.current.value = "";
      if(document.getElementById('fileWarn').classList.contains('!block')) {
        document.getElementById('fileWarn').classList.remove('!block');
      }
    }
  }

  const data = {
    collections,
    folders,
    files,
    filesChildDirs,
    colNameRef,
    foldNameRef,
    fileNameRef,
    checkedConnector,
    checkedExpress,
    colConnectorServerRef,
    colPortRef,
    colServerRef,
    colWorksNameRef,
    colWorksNickRef,
    colWorksPassRef,
    colWorksDBRef,
    colWorksSelectRef,
    filepath,
    deleteItemRef,
    deleteItemType,
    clearRefs,
    deleteItems,
    getColWorks,
    getFileWorks,
    getFolderWorks,
    setCheckedConnector,
    setCheckedExpress,
    setDeleteItemRef,
    setDeleteItemType,
    setFilePath,
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
