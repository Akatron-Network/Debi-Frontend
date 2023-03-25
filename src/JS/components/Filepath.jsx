import React , { useContext , useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { MainContext , ChartContext } from './context'

export default function Filepath() {
  const data = useContext(MainContext);
  const { savePage } = useContext(ChartContext);
  console.log(data);

  const [link, setLink] = useState("");

  const getLink = () => {
    if(data.filepath.length === 0) {
      setLink(
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap'>
          <li className="file-path-top-text">
            <Link to={"/"}>Anasayfa</Link>
          </li>
        </ul>
      )
    }

    else if(data.filepath.length > 0) {
      setLink(
        <ul className='overflow-auto max-w-[1243px] whitespace-nowrap'>
          <li key="-1" className="file-path-top-text">
            <Link to={"/"}>Anasayfa</Link>
          </li>
          {data.filepath.map((path) => (
            <li key={path.id} className="file-path-top-text">
              <Link to={path.url}>{path.name}</Link>
            </li>
          ))}
        </ul>
      )
    }
  }

  useEffect(() => {
    getLink();
  }, [data.filepath.length])

  return (
    <>
      <div id="file_path_top" className="w-[calc(100%_-_70px)] top-11 left-[70px] absolute pl-5 pr-3 py-2 bg-shadow_green shadow-filepath breadcrumbs !flex justify-between items-center overflow-hidden">
        {link}

        {data.checkInPage ? 
          <div className='border-l border-l-onyx_middle'>
            <div className="tooltip tooltip-left ml-3" data-tip="Öğe Oluştur">
              <label id="new_btn" htmlFor="chart_choose" className='green-btn'><i className="fas fa-plus" /></label>
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
