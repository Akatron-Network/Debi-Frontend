import React , { useContext } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';

export default function FoldFileCreator() {
	const data = useContext(MainContext);
  
  const addWorksApply = async () => {

    if(data.foldNameRef.current.value !== ""){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

      let parentdir = undefined;

      if (data.filepath.length > 1) {
        parentdir = data.filepath[data.filepath.length - 1].id
      }

      if (Object.keys(data.editFolderDetails).length > 0) {
        await WorkspaceAll.putFolders(data.editFolderDetails.directory_id , {directory_name: data.foldNameRef.current.value});
      }
      else {
        await WorkspaceAll.postFolders(data.filepath[0].id , data.foldNameRef.current.value , parentdir);
      }
      
      
      if (data.filepath.length > 1) {
        data.funcLoad(data.getFileWorks, data.filepath[data.filepath.length -1].id);
      }
      else {
        data.funcLoad(data.getFolderWorks, data.filepath[0].id);
      }

      data.getTreeCollections();
      document.getElementById('addWorksFold').checked = false;
    
    }
    else {
      document.getElementById('foldWarn').classList.add('!block');
    }
	}

  return (
    <div>
      <input type="checkbox" id="addWorksFold" className="modal-toggle" />
      <label htmlFor="addWorksFold" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
        <h2 className="text-xl mb-3 text-platinium">{Object.keys(data.editFolderDetails).length <= 0 ? "Klasör Oluştur" : "Klasörü Düzenle"}</h2>
          <h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>klasör</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.foldNameRef} />
            <span id='foldWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
            <button onClick={() => data.funcLoad(addWorksApply)} className='green-btn float-right mt-3'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
