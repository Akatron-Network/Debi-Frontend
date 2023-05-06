import React , { useContext , useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { MainContext , ChartContext } from './context'

export default function Filepath() {
  const data = useContext(MainContext);
  const { savePage, setAllPanelsDragResize, allPanelsDragResize, refreshPage, btnShowHide } = useContext(ChartContext);

  const [link, setLink] = useState("");

  const getLink = () => {
    if(data.filepath.length === 0) {
      setLink(
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap'>
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
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap'>
          <li key="-1" className="file-path-top-text">
            <Link to={"/"}>
              <i className="fa-solid fa-house-chimney mr-[6px]"></i>
              Anasayfa
            </Link>
          </li>
          {data.filepath.map((path) => {
            return (
            <li key={path.id} className="file-path-top-text">
              <Link to={path.url}>{path.name}</Link>
            </li>
          )})}
        </ul>
      )
    }
  }

  useEffect(() => {
    getLink();
  }, [data.filepath.length])

  return (
    <>
      <div id="file_path_top" className="w-[calc(100%_-_70px)] top-11 left-[70px] fixed z-2 pl-5 pr-3 py-2 bg-shadow_green shadow-filepath breadcrumbs !flex justify-between items-center overflow-hidden">
        {link}

        {data.checkInPage && btnShowHide ? 
          <div id='report_screen_buttons'>
            <div className="tooltip tooltip-left pr-3 border-r border-r-onyx_middle" data-tip="Yeni Öğe Oluştur">
              <label id="new_btn" htmlFor="chart_choose" className='green-btn'><i className="fas fa-plus" /></label>
            </div>

            <div className="tooltip tooltip-left ml-3" data-tip="Panelleri Aç / Kilitle">
              <label onClick={() => setAllPanelsDragResize(!allPanelsDragResize)} className='gray-btn'>{allPanelsDragResize ? <i className="fa-solid fa-lock-open"></i> : <i className="fa-solid fa-lock"></i>}</label>
            </div>

            <div className="tooltip tooltip-left ml-3" data-tip="Panelleri Yenile">
              <label onClick={() => refreshPage()} className='gray-btn bg-orange-900 hover:bg-orange-700'><i className="fa-solid fa-rotate"></i></label>
            </div>

            <div className="tooltip tooltip-left ml-2" data-tip="Sayfayı Kaydet">
              <button id='save-page-btn' onClick={savePage} className='purple-btn'><i className="fa-solid fa-floppy-disk"></i></button>
            </div>
          </div>
        
        : undefined}

      </div>

    </>
  )
}
