import React , { useContext } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';

export default function FoldFileCreator() {
	const data = useContext(MainContext);
  
  const addWorksApply = async (type) => {

    if(data.worksNameRef.current.value !== ""){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

      if (type === 'klasör') {
        let parentdir = undefined;

        if (data.filepath.length > 1) {
          parentdir = data.filepath[data.filepath.length - 1].id
        }
        await WorkspaceAll.postFolders(data.filepath[0].id , data.worksNameRef.current.value , parentdir);
        
        if (data.filepath.length > 1) {
          data.getFileWorks(data.filepath[data.filepath.length -1].id);
        }
        else {
          data.getFolderWorks(data.filepath[0].id);
        }
      }

      else if (type === 'sayfa') {
        await WorkspaceAll.postFiles(data.filepath[0].id , data.filepath[data.filepath.length - 1].id  , data.worksNameRef.current.value);
        data.getFileWorks(data.filepath[data.filepath.length -1].id);
      }

      document.getElementById('addWorks').checked = false;
      data.worksNameRef.current.value = "";
    
    }
    else {
      document.getElementById('foldfileWarn').classList.add('!block');
    }
	}

  // const a = () => {
    
  //   if(document.getElementById('foldfileWarn').classList.contains('!block')) {
  //     document.getElementById('foldfileWarn').classList.remove('!block');
  //   }
  // }

  // useEffect(() => {
  //   a();
  
  // }, [])
  

  return (
    <div>
      <input type="checkbox" id="addWorks" className="modal-toggle" />
      <label htmlFor="addWorks" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
          <h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>{data.type}</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.worksNameRef} />
            <span id='foldfileWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
            <button onClick={() => addWorksApply(data.type)} className='green-btn float-right mt-3'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
