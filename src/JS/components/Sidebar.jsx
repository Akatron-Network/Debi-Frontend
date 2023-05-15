import React , {useState, useEffect, useContext} from 'react'
import MainTree from './sidebar/MainTree'
import Shared from './sidebar/Shared'
import Favorites from './sidebar/Favorites'
import DataModalList from './sidebar/DataModalList'
import { MainContext } from './context'

export default function Sidebar() {
  const {errorText, openCloseSideBar, page, openWithTab} = useContext(MainContext)

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
            <div id="sidepanel" className='w-[250px] -translate-x-[250px] fixed z-2 h-[calc(100vh_-_44px)] overflow-auto top-11 left-0 bg-side_black pt-4'>
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
              

            <div className="btm-nav shadow-bottomNavigation sm:hidden bg-darker_jet">
              <button id="open_bottom_btn_1" className='bottom-nav-btn active' onClick={() => openWithTab(0, "phone")}>
                <i className="fas fa-sitemap"></i>
              </button>
              <button id="open_bottom_btn_2" className="bottom-nav-btn" onClick={() => openWithTab(1, "phone")}>
                <i className="fas fa-people-arrows"></i>
              </button>
              <button id="open_bottom_btn_3" className='bottom-nav-btn' onClick={() => openWithTab(2, "phone")}>
                <i className="fas fa-star"></i>
              </button>
            </div>

            </div>

            <div id="sidelinks" className='w-[70px] fixed hidden sm:block z-1 h-screen top-11 sm:left-0 left-[-70px] bg-black_light shadow-sidelinks'>
              <div id='all_tabs_in_sidepanel' className='h-fit'>
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
            </div>
            
            <div className="w-[30px] fixed z-1 h-screen sm:left-[70px] left-0 overflow-x-hidden shadow-openclose top-11">
                <button id="openclose" onClick={openCloseSideBar} className="text-xl bg-black_light text-sea_green !w-[30px] h-[70px] border-none transition duration-300 shadow-openclosebtn top-1/2 -translate-y-1/2 fixed rounded-br-lg rounded-tr-lg hover:text-green_pantone hover:bg-side_black">
                    <i id="open_close_btn" className="fas fa-chevron-right" style={{transition: ".5s"}}></i>
                </button>
            </div>
        </div>
    </>
  )
}



