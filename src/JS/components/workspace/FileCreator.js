import React , { useContext } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';

export default function FoldFileCreator(props) {
	const data = useContext(MainContext);
  
  const addWorksApply = async () => {

    if(data.fileNameRef.current.value !== ""){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

      await WorkspaceAll.postFiles(data.filepath[0].id , data.filepath[data.filepath.length - 1].id  , data.fileNameRef.current.value);
      data.getFileWorks(data.filepath[data.filepath.length -1].id);

      document.getElementById('addWorksFile').checked = false;

    }
    else {
      document.getElementById('fileWarn').classList.add('!block');
    }
	}

  return (
    <div>
      <input type="checkbox" id="addWorksFile" className="modal-toggle" />
      <label htmlFor="addWorksFile" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
          <h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>sayfa</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.fileNameRef} />
            <span id='fileWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
            <button onClick={() => addWorksApply()} className='green-btn float-right mt-3'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
