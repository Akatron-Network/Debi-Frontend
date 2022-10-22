import React , { useContext } from 'react'
import WorkspaceAll from '../../libraries/categories/Workspace';
import { MainContext } from '../context'


export default function AddColFoldFile() {
	const data = useContext(MainContext);

	const addWorksApply = async (type) => {

    if(data.worksNameRef.current.value.length > 0){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

      if (type === 'koleksiyon') {
        await WorkspaceAll.postCollections(data.worksNameRef.current.value);
        data.getColWorks();
      }
      else if (type === 'klasör') {
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
      console.log("Bu boş");
    }
	}


  return (
	<>
		<input type="checkbox" id="addWorks" className="modal-toggle" />
		<label htmlFor="addWorks" className="modal bg-modal_back">
		<label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
			<h3 className="text-lg">Lütfen bir <span className='font-bold text-sea_green'>{data.type}</span> adı girin.</h3>
				<input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.worksNameRef} />
				<button onClick={() => addWorksApply(data.type)} className='green-btn float-right mt-3'>Kaydet</button>
			</label>
		</label>
	</>
  )
}
