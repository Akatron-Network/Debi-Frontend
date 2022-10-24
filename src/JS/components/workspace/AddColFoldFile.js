import React , { useContext } from 'react'
import { MainContext } from '../context'
import FoldFileCreator  from './FoldFileCreator'
import ColConnectorCreateor  from './ColConnectorCreateor'


export default function AddColFoldFile() {
	const data = useContext(MainContext);

  const checkType = (type) => {
    if(type !== 'koleksiyon') { return( <FoldFileCreator /> ) }
    else { return( <ColConnectorCreateor /> ) }
  }

	// const addWorksApply = async (type) => {

  //   if(data.worksNameRef.current.value.length > 0){ //? İlk input boş mu dolu mu onu kontrol ettik daha sonra hangi type olduğuna baktık

  //     // if (type === 'koleksiyon') {
  //     //   await WorkspaceAll.postCollections(data.worksNameRef.current.value);
  //     //   data.getColWorks();
  //     // }
  //     if (type === 'klasör') {
  //       let parentdir = undefined;

  //       if (data.filepath.length > 1) {
  //         parentdir = data.filepath[data.filepath.length - 1].id
  //       }
  //       await WorkspaceAll.postFolders(data.filepath[0].id , data.worksNameRef.current.value , parentdir);
        
  //       if (data.filepath.length > 1) {
  //         data.getFileWorks(data.filepath[data.filepath.length -1].id);
  //       }
  //       else {
  //         data.getFolderWorks(data.filepath[0].id);
  //       }
  //     }

  //     else if (type === 'sayfa') {
  //       await WorkspaceAll.postFiles(data.filepath[0].id , data.filepath[data.filepath.length - 1].id  , data.worksNameRef.current.value);
  //       data.getFileWorks(data.filepath[data.filepath.length -1].id);
  //     }

  //     document.getElementById('addWorks').checked = false;
  //     data.worksNameRef.current.value = "";
    
  //   }
  //   else {
  //     console.log("Bu boş");
  //   }
	// }


  return ( <>{checkType(data.type)}</> )
}
