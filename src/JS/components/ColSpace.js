import React , { useState , useEffect } from 'react'
import Collections from './Collections'
import WorkspaceAll from '../libraries/categories/Workspace';

export default function ColSpace() {


  // const worksNameRef = useRef(null);

  // const [type, setType] = useState('');
  // const addWorks = (type) => {
  //   worksNameRef.current.value = "";
  //   setType(type);
  // }

  // const addWorksApply = async (type) => {

  //   if(worksNameRef.current.value.length > 0){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

  //     if (type === 'koleksiyon') {
  //       await WorkspaceAll.postCollections(worksNameRef.current.value);
  //       getColWorks();
  //     }
  //     else if (type === 'klasör') {
  //       await WorkspaceAll.postFolders(worksNameRef.current.value);
  //       getFolderWorks();
  //     }
  //     else if (type === 'sayfa') {
  //       await WorkspaceAll.postFiles(worksNameRef.current.value);
  //       getFileWorks();
  //     }

  //     document.getElementById('addWorks').checked = false;
  //     worksNameRef.current.value = "";
      
  //   }
  //   else {
  //     console.log("Bu boş");
  //   }

  // }


  // const [folders, setFolders] = useState([]);
  // const [files, setFiles] = useState([]);

  // const getFolderWorks = async () => {
  //   let resp = await WorkspaceAll.getFolders();
  //   setFolders(resp.Data.owned_directories);
  // }
  // const getFileWorks = async () => {
  //  let resp = await WorkspaceAll.getFiles();
  //  setFiles(resp.Data.owned_pages);
  // }

  const [collections, setCollections] = useState([]);

  const getColWorks = async () => {
    let resp = await WorkspaceAll.getCollections();
    setCollections(resp.Data.owned_collections);
  }

  useEffect(() => { getColWorks() }, [])

  return (
    <>
      <Collections collections={collections} getColWorks={() => getColWorks()} />
    </>
  )
}
