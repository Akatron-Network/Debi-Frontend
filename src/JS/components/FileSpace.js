import React , { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import WorkspaceAll from '../libraries/categories/Workspace';
import Files from './Files'

export default function FoldSpace() {
	const { foldID } = useParams();

  const [files, setFiles] = useState([]);
    
  const getFileWorks = async () => {
    let resp = await WorkspaceAll.getFiles();
    setFiles(resp.Data.owned_pages);
	}
  useEffect(() => { getFileWorks() }, [])

  return (
    <>
			<Files files={files} getFileWorks={() => getFileWorks()}/>
			Burası koleksiyon: {foldID}
    </>
  )
}
