import React , {useContext , useEffect , useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DragResizePanels from '../components/DragResizePanels';
import WorkspaceAll from '../libraries/categories/Workspace'
import {ChartContext , MainContext, ShareContext} from '../components/context'
import Service from '../libraries/categories/Service';

export default function ChartLayout() {
  const chart_data = useContext(ChartContext);
  const share_data = useContext(ShareContext);
  const { setFilePath, setCheckInPage, funcLoad, toastCreator, toastDelete, reportPageJoyrideClickStart } = useContext(MainContext);

	const { fileID } = useParams();

  //! LOGIN CHECK ----------------------------------
  var navigate = useNavigate();

  const loginControl = async () => {
    try {
      let tkn = await Service.getProfile()
    } catch (error) {
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
			if (share_data.sharedDirectories.length === 0) {
        if (share_data.sharedPages.length === 0) {
          funcLoad(share_data.getShare);
        }
			}
		}

    check();

		setTimeout(() => {
			toastCreator(reportPageJoyrideClickStart, "Rapor ekranındaki tüm özellikleri keşfetmek için öğreticiyi çalıştırın!")
		}, 300);
  
    return () => {
			toastDelete();

      if (document.getElementById('file_path_top') !== null) { // Panel ekranında çıkış yaparken hata verebiliyor. O yüzden koydum
        document.getElementById('file_path_top').style.display = "block";
        setCheckInPage(false);
      }
    }
  }, [fileID])

	useEffect(() => {
		check();
	}, [share_data.sharedCollections, share_data.sharedDirectories, share_data.sharedPages])

  //f For Coordinates Error
  useEffect(() => {
    return () => {
      chart_data.setPageContent({page_data : {panels: [], dragresize: false}});
    }
  }, [])
  
	const check = () => {

		if (share_data.sharedCollections.length !== 0) {

			for (let col of share_data.sharedCollections) {
				for (let dir of col.collection.directories) {
	
					if (dir.directory_id === parseInt(fileID)) {
						if (col.editable === false) {
							share_data.setBtnShowHide(false);
							return;
						}
						else {
							share_data.setBtnShowHide(true);
						}
					}
	
				}
			}
		}

		if (share_data.sharedDirectories.length !== 0) {

			for (let dir of share_data.sharedDirectories) {

				if (dir.directory_id === parseInt(fileID)) {
					if (dir.editable === false) {
						share_data.setBtnShowHide(false);
						return;
					}
					else {
						share_data.setBtnShowHide(true);
					}
				}

			}
		}

		if (share_data.sharedPages.length !== 0) {

			for (let page of share_data.sharedPages) {

				if (page.page_id === parseInt(fileID)) {
					if (page.editable === false) {
						share_data.setBtnShowHide(false);
						return;
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
