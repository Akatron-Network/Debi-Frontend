import React , { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import WorkspaceAll from '../libraries/categories/Workspace';
import Folders from './Folders'

export default function FoldSpace() {
	const { colID } = useParams();

  const [folders, setFolders] = useState([]);
    
  const getFolderWorks = async () => {
    let resp = await WorkspaceAll.getFolders();
    setFolders(resp.Data.owned_directories);
  }

  useEffect(() => { getFolderWorks() }, [])

  return (
    <>
			<Folders folders={folders}  getFolderWorks={() => getFolderWorks()} /> //!SORUN BU SATIRDAN KAYNAKLI
			Burası koleksiyon: {colID}
    </>
  )
}
