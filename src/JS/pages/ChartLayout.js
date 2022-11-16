import React , {useContext , useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import DragResizePanels from '../components/DragResizePanels';
import WorkspaceAll from '../libraries/categories/Workspace'
import {ChartContext} from '../components/context'

export default function ChartLayout() {
  const chart_data = useContext(ChartContext);
	const { fileID } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.getElementById('file_path_top').style.display = "none";
    document.getElementById('new_btn').style.display = "flex";
    // document.getElementById('page-btn').style.display = "flex";
    document.getElementById('save-page-btn').style.display = "flex";

    getFiles(fileID);
  
    return () => {
      console.log(fileID);

      document.getElementById('file_path_top').style.display = "block";
      document.getElementById('new_btn').style.display = "none";
      // document.getElementById('page-btn').style.display = "none";
      document.getElementById('save-page-btn').style.display = "none";
    }
  }, [fileID])

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
