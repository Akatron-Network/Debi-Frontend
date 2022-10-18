import React  from 'react'
import WorkspaceAll from '../libraries/categories/Workspace';


export default function AddColFoldFile({ type , worksNameRef , getColWorks  , getFolderWorks , getFileWorks}) {

	const addWorksApply = async (type) => {

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


  return (
	<>
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
