import React , { useState , useEffect , useRef } from 'react'
import Collections from './Collections'
import Folders from './Folders'
import Files from './Files'

import WorkspaceAll from '../libraries/categories/Workspace';

export default function Workspace() {

  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const [type, setType] = useState('');
  const addWorks = (type) => {
    worksNameRef.current.value = "";
    setType(type);
  }

  const worksNameRef = useRef(null);

  const addWorksApply = async (type) => {
    // e.preventDefault();

    if(worksNameRef.current.value.length > 0){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

      if (type === 'koleksiyon') {
        await WorkspaceAll.postCollections(worksNameRef.current.value);
        getColWorks();
      }
      else if (type === 'klasör') {
        await WorkspaceAll.postFolders(worksNameRef.current.value);
        getFolderWorks();
      }
      else if (type === 'sayfa') {
        await WorkspaceAll.postFiles(worksNameRef.current.value);
        getFileWorks();
      }

      document.getElementById('addWorks').checked = false;
      worksNameRef.current.value = "";
      
    }
    else {
      console.log("Bu boş");
    }

  }

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

  useEffect(() => {
  
    getColWorks();
    getFolderWorks();
    getFileWorks();
  
  }, [])




  return (
    <>
        <div className="py-[89px] pl-[100px] pr-[38px]">
          
          <h2 className="workspace-titles">Koleksiyonlar</h2>
          <div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">
            
            <Collections collections={collections} />

            <label htmlFor="addWorks" onClick={() => addWorks('koleksiyon')}>
              <div className="col-card add col-span-1">
                <div className="card">
                  <div className="col-content">
                    <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                  </div>
                </div>
              </div>
            </label>


            
          </div>

          <hr className="hrCols"></hr>

          <h2 className="workspace-titles">Klasörler</h2>
          <div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

            <Folders folders={folders} />

            <label htmlFor="addWorks" onClick={() => addWorks('klasör')} className="fold-card add col-span-1">
              <div className="card">
                <div className="col-content">
                  <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                </div>
              </div>
            </label>
          </div>

          <hr className="hrCols"></hr>

          <h2 className="workspace-titles">Sayfalar</h2>

          <div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

            <Files files={files} />
            
            <label htmlFor="addWorks" onClick={() => addWorks('sayfa')} className="fold-card add col-span-1">
              <div className="card">
                <div className="col-content">
                  <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                </div>
              </div>
            </label>
          </div>

        </div>

        <input type="checkbox" id="addWorks" className="modal-toggle" />
        <label htmlFor="addWorks" className="modal cursor-pointer bg-modal_back">
        <label className="modal-box relative max-w-fit h-fit p-3 bg-black_light rounded" htmlFor="">
          <h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>{type}</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={worksNameRef} />
            <button onClick={() => addWorksApply(type)} className='green-btn float-right mt-1'>Kaydet</button>
          </label>
        </label>
    
    
    </>
  )
}
