import React , { useContext , useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { MainContext , ChartContext } from './context'

export default function Filepath() {
  const data = useContext(MainContext)
  const { savePage, setAllPanelsDragResize, allPanelsDragResize, refreshPage, btnShowHide } = useContext(ChartContext);

  const [link, setLink] = useState("");
  const [back, setBack] = useState("/");

  const getLink = () => {
    if(data.filepath.length === 0) {
      setLink(
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap w-[inherit]'>
          <li className="file-path-top-text">
            <Link to={"/"}>
              <i className="fa-solid fa-house-chimney mr-[6px]"></i>
              Anasayfa
            </Link>
          </li>
        </ul>
      )
    }

    else if(data.filepath.length > 0) {
      setLink(
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap w-[inherit]'>
          <li key="-1" className="file-path-top-text">
            <Link to={"/"}>
              <i className="fa-solid fa-house-chimney mr-[6px]"></i>
              Anasayfa
            </Link>
          </li>
          {data.filepath.map((path) => {
            if (path.url.split("/").length - 1 === 1) {
              return (
                <li key={path.id} className="file-path-top-text pointer-events-none">
                  <Link to={path.url}>{path.name}</Link>
                </li>
              )
            }
            else {
              return (
                <li key={path.id} className="file-path-top-text">
                  <Link to={path.url}>{path.name}</Link>
                </li>
              )
            }
            // else if (path.url.split("/").length - 1 === 2) {
            //   if (data.files.parent_directory !== null) {
            //     return (
            //       <li key={path.id} className="file-path-top-text">
            //         <Link to={path.url}>{path.name}</Link>
            //       </li>
            //     )
            //   }              
            // }
          })}
        </ul>
      )
    }
  }

  useEffect(() => {
    getLink();

    if (data.filepath.length > 0) {
      if (data.filepath.length > 2) { setBack(data.filepath[data.filepath.length - 2].url) }
      else { setBack("/") }
    }
  }, [data.filepath.length])

  return (
    <>
      <div id="file_path_top" className="w-full sm:w-[calc(100%_-_70px)] top-11 sm:left-[70px] gap-3 md:gap-0 fixed z-2 px-3 py-2 bg-shadow_green shadow-filepath breadcrumbs !flex flex-row md:flex-row justify-between items-center overflow-hidden">
        
        <Link to={back} id="back_btn" className="px-2 text-xl block sm:hidden"><i className="fa-solid fa-chevron-left"></i></Link>
        
        {link}

        {data.checkInPage && btnShowHide ? 
          <div id='report_screen_buttons' className='sm:min-w-[180px]'>
            <div className="tooltip tooltip-left pr-3 hidden sm:inline-block border-r border-r-onyx_middle" data-tip="Yeni Öğe Oluştur">
              <label id="new_btn" htmlFor="chart_choose" className='green-btn'><i className="fas fa-plus" /></label>
            </div>

            <div className="tooltip tooltip-left ml-3 hidden sm:inline-block" data-tip="Panelleri Aç / Kilitle">
              <label onClick={() => setAllPanelsDragResize(!allPanelsDragResize)} className='gray-btn'>{allPanelsDragResize ? <i className="fa-solid fa-lock-open"></i> : <i className="fa-solid fa-lock"></i>}</label>
            </div>

            <div className="tooltip tooltip-left ml-3" data-tip="Panelleri Yenile">
              <label onClick={() => refreshPage()} className='gray-btn bg-orange-900 hover:bg-orange-700'><i className="fa-solid fa-rotate"></i></label>
            </div>

            <div className="tooltip tooltip-left ml-3 hidden sm:inline-block" data-tip="Sayfayı Kaydet">
              <button id='save-page-btn' onClick={savePage} className='purple-btn'><i className="fa-solid fa-floppy-disk"></i></button>
            </div>
          </div>
        
        : undefined}

      </div>

    </>
  )
}
