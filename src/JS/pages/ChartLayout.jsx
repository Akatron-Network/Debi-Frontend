import React , {useContext , useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import DragResizePanels from '../components/DragResizePanels';
import WorkspaceAll from '../libraries/categories/Workspace'
import {ChartContext , ShareContext} from '../components/context'

export default function ChartLayout() {
  const chart_data = useContext(ChartContext);
  const share_data = useContext(ShareContext);
	const { fileID } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.getElementById('file_path_top').style.display = "none";
    document.getElementById('new_btn').style.display = "flex";
    // document.getElementById('page-btn').style.display = "flex";
    document.getElementById('save-page-btn').style.display = "flex";

    getFiles(fileID);
    
		if (share_data.sharedCollections.length === 0) {
			share_data.getShare();
		}
		else { 
      check() }
  
    return () => {      
      if (document.getElementById('file_path_top') !== null) { // Panel ekranında çıkış yaparken hata verebiliyor. O yüzden koydum
        document.getElementById('file_path_top').style.display = "block";
        document.getElementById('new_btn').style.display = "none";
        // document.getElementById('page-btn').style.display = "none";
        document.getElementById('save-page-btn').style.display = "none";
      }
    }
  }, [fileID])

	useEffect(() => {
		check();
	}, [chart_data.pageContent])

	const check = () => {

		for (let col of share_data.sharedCollections) { 

      if (col.collection_id === chart_data.pageContent.collection_id) { //. Check collectionID
        if (col.editable === false) {	//. Check editable
          share_data.setBtnShowHide(false);
          return;
        }
      }
      else {                                                            //. If not equal check directoryID

        for (let dir of col.collection.directories) {
          if(dir.directory_id === chart_data.pageContent.directory_id) {
            if (col.editable === false) {	//. Check editable
              share_data.setBtnShowHide(false);
              return;
            }
          }
          else {
            share_data.setBtnShowHide(true);
          }
        }

      }
		}
	}

  //* Hangi sayfada olduğumuz görmek için başlık olarak bunu çektik ve buraya yazacağız
  const getFiles = async (id) => {
    let resp = await WorkspaceAll.getFiles(id);
    if(resp.Data.page_data === null) {
      resp.Data.page_data = { panels: [] }
    }
    chart_data.setPageContent(resp.Data);
    setTitle(resp.Data.page_name);
  }
  

  return (
    <div className='-mt-[46px]'>
		  <h2 className="workspace-titles text-[1.3rem] mt-2 mb-0">{title}</h2>
		  <hr className="hrCols mt-2 mb-0"></hr>
      <DragResizePanels />
    </div>
  )
}
