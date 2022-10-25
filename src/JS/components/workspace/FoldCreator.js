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
      await WorkspaceAll.postFolders(data.filepath[0].id , data.foldNameRef.current.value , parentdir);
      
      if (data.filepath.length > 1) {
        data.getFileWorks(data.filepath[data.filepath.length -1].id);
      }
      else {
        data.getFolderWorks(data.filepath[0].id);
      }

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
          <h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>klasör</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.foldNameRef} />
            <span id='foldWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
            <button onClick={() => addWorksApply()} className='green-btn float-right mt-3'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
