import React , {useContext , useEffect , useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DragResizePanels from '../components/DragResizePanels';
import WorkspaceAll from '../libraries/categories/Workspace'
import {ChartContext , MainContext, ShareContext} from '../components/context'
import Service from '../libraries/categories/Service';

export default function ChartLayout() {
  const chart_data = useContext(ChartContext);
  const share_data = useContext(ShareContext);
  const { setFilePath, setCheckInPage, funcLoad } = useContext(MainContext);

	const { fileID } = useParams();

  //! LOGIN CHECK ----------------------------------
  var navigate = useNavigate();

  const loginControl = async () => {
    try {
      let tkn = await Service.getProfile()
    } catch (error) {
      console.log(error);
      navigate("/giris")
    }
  }

  useEffect(() => {
    if (localStorage.Token !== undefined) { loginControl() }
    else { navigate("/giris") }
  }, [])
  //! --------------------------------------------

  useEffect(() => {
    funcLoad(getFiles, fileID);
    
		if (share_data.sharedCollections.length === 0) {
			share_data.getShare();
		}
		else { check() }
  
    return () => {      
      if (document.getElementById('file_path_top') !== null) { // Panel ekranında çıkış yaparken hata verebiliyor. O yüzden koydum
        document.getElementById('file_path_top').style.display = "block";
        setCheckInPage(false);
      }
    }
  }, [fileID])

	useEffect(() => {
		check();
	}, [chart_data.pageContent])

  //f For Coordinates Error
  useEffect(() => {
    return () => {
      chart_data.setPageContent({page_data : {panels: [], dragresize: false}});
    }
  }, [])
  
	const check = () => {

		for (let col of share_data.sharedCollections) { 

      if (col.collection_id === chart_data.pageContent.collection_id) { //. Check collectionID
        if (col.editable === false) {	                                  //. Check editable
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
    
    setFilePath(resp.Data.path);
    chart_data.setPageContent(resp.Data);
    setCheckInPage(true);
  }
  
  return (
    <>
		  {/* <h2 className="workspace-titles text-[1.3rem] mt-2 mb-0">{title}</h2>
		  <hr className="hrCols mt-2 mb-0"></hr> */}
      <DragResizePanels />
    </>
  )
}
