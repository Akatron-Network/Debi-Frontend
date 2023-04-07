import React , {useState, useEffect, useContext} from 'react'
import MainTree from './sidebar/MainTree'
import Shared from './sidebar/Shared'
import Favorites from './sidebar/Favorites'
import DataModalList from './sidebar/DataModalList'
import Loading from './Loading'
import LoadingForCharts from '../charts/modals/LoadingForCharts'
import ErrorForCharts from '../charts/modals/ErrorForCharts'
import { MainContext } from './context'

export default function Sidebar() {
  const {errorText} = useContext(MainContext)

	const [page, setPage] = useState(<MainTree fn={() => openCloseSideBar()} />);

	const openPage = (id) => {
		if(id === 0) { setPage(<MainTree fn={() => openCloseSideBar()} />) }
		else if(id === 1) { setPage(<Shared />) }
		else if(id === 2) { setPage(<Favorites fn={() => openCloseSideBar()} />) }
		else if(id === 3) { setPage(<DataModalList />) }
	}

  var tab_id = [1,2,3,4];
	const openWithTab = (id) => {

		var open_btn = document.getElementById('open_btn_' + tab_id[id]);
		let open_close_btn = document.getElementById('open_close_btn');

		if(open_close_btn.style.transform === 'rotateZ(180deg)') {
			if(open_btn.classList.contains('bg-side_black')) { openCloseSideBar() } //? Açık tab a tekrar tıklandığında sidebar kapanması için koydum
			else { tabShown(id); openPage(id)	}
		}
		else { openCloseSideBar(); tabShown(id); openPage(id) }
	}

	const tabShown = (id) => { //* Sidepanel'de açık olan tabı gösterir. Açık olan tabın üzeri yeşil olur

		for(var a in tab_id) {

			var open_btn = document.getElementById('open_btn_' + tab_id[a]);
			
			open_btn.classList.replace('shadow-openbtn','shadow-defaultbtn');
			open_btn.classList.replace('text-sea_green','text-grayXgray');
			open_btn.classList.replace('bg-side_black','bg-black_light');

		}

		open_btn = document.getElementById('open_btn_' + tab_id[id]);

		open_btn.classList.replace('shadow-defaultbtn','shadow-openbtn');
		open_btn.classList.replace('text-grayXgray','text-sea_green');
		open_btn.classList.replace('bg-black_light','bg-side_black');

	}

	const openCloseSideBar = () => {
	
		let allsidepanel = document.getElementById('allsidepanel');
		let open_close_btn = document.getElementById('open_close_btn');
	
			if(open_close_btn.style.transform === 'rotateZ(180deg)') {
				allsidepanel.style.transform = 'translateX(0px)';
				allsidepanel.classList.remove("w-full" , "!bg-none_opacity");
				open_close_btn.style.transform = 'rotateZ(0deg)';
			}
	
			else {
				allsidepanel.style.transform = 'translateX(250px)';
				allsidepanel.classList.add("w-full" , "!bg-none_opacity");
				open_close_btn.style.transform = 'rotateZ(180deg)';
			}
	}

  useEffect(() => { //* When click outside the sidepanel close sidepanel
    document.addEventListener('click', closeSidePanel)
    return () => { document.removeEventListener('click', closeSidePanel) }
  }, [])

  const closeSidePanel = (e) => { //* For show-hide sidepanel
    if (e.target.id === "allsidepanel") {
					openCloseSideBar();
    }

  }


  return (
    <>
        <div id="allsidepanel" className='h-screen translate-x-0 fixed transition duration-500 z-[3]'>
            <div id="sidepanel" className='w-[250px] -translate-x-[250px] fixed z-2 h-[calc(100vh_-_45px)] overflow-auto top-11 left-0 bg-side_black pt-4'>
							{page}
              
              {/* LOADING SCREEN */}
              <input type="checkbox" id="loadingScreenSidebar" className="modal-toggle" />
              <div className="modal bg-modal_back">
                <div className="text-center">
                  <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                  <div className="modal-action justify-center">
                    <label htmlFor="loadingScreenSidebar" className="gray-btn hidden">Kapat!</label>
                  </div>
                </div>
              </div>

              {/* ERROR SCREEN */}
              <input type="checkbox" id="errorScreenSidebar" className="modal-toggle" />
              <div className="modal bg-modal_back">
                <div className="modal-box bg-middle_black rounded w-[80%] p-0">
                  <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-jet_shadow rounded-t">
                    <div className="flex text-2xl items-center mb-3">
                      <i className="fa-solid fa-circle-exclamation text-danger_light"></i>
                      <h1 className='text-platinium ml-3'>Hata</h1>
                    </div>
                    <label type="button" htmlFor="errorScreenSidebar" className="text-oxford_blue mt-[2px] bg-transparent cursor-pointer text-base hover:bg-jet_shadow hover:text-platinium transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></label>
                  </div>
                  <div className="p-5 pt-3 flex flex-col">
                    <span className='text-lg font-bold text-danger_light'>{errorText.code}</span>
                    <span className='text-base font-bold text-grayXgray'>{errorText.message}</span>
                    <hr className="h-px w-2/3 relative left-0 bg-darker_jet border-0 my-2"></hr>
                    <span className='text-base text-graysix'>{errorText.response}</span>
                  </div>
                </div>
              </div>

            </div>

            <div id="sidelinks" className='w-[70px] fixed z-1 h-screen top-11 left-0 bg-black_light shadow-sidelinks'>
                <div className="tooltip tooltip-right" data-tip="Çalışma Alanı">
                    <button id="open_btn_1" onClick={() => openWithTab(0)} className='open-tab bg-side_black text-sea_green shadow-openbtn'>
                        <i className="fas fa-sitemap"></i>
                    </button>
                </div>
                <div className="tooltip tooltip-right" data-tip="Benimle Paylaşılanlar">
                    <button id="open_btn_2" onClick={() => openWithTab(1)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
                        <i className="fas fa-people-arrows"></i>
                    </button>
                </div>
                <div className="tooltip tooltip-right display-no" data-tip="Favoriler">
                    <button id="open_btn_3" onClick={() => openWithTab(2)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
                        <i className="fas fa-star"></i>
                    </button>
                </div>
                <div className="tooltip tooltip-right display-no" data-tip="Veri Modelleri">
                    <button id="open_btn_4" onClick={() => openWithTab(3)} className='open-tab bg-black_light text-grayXgray shadow-defaultbtn'>
                      <i className="fa-solid fa-chart-simple"></i>
                    </button>
                </div>
            </div>
            
            <div id="openclose" className="w-[30px] fixed z-1 h-screen left-[70px] overflow-x-hidden shadow-openclose top-11">
                <button onClick={openCloseSideBar} className="text-xl bg-black_light text-sea_green !w-[30px] h-[70px] border-none transition duration-300 shadow-openclosebtn top-1/2 -translate-y-1/2 fixed rounded-br-lg rounded-tr-lg hover:text-green_pantone hover:bg-side_black">
                    <i id="open_close_btn" className="fas fa-chevron-right" style={{transition: ".5s"}}></i>
                </button>
            </div>
        </div>
    </>
  )
}



