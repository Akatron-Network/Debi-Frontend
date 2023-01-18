import React , { useContext , useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { MainContext } from './context'

export default function Filepath() {
  const data = useContext(MainContext);

  const [link, setLink] = useState("");

  const getLink = () => {
    if(data.filepath.length === 0) {
      setLink(
        <ul>
          <li className="file-path-top-text">
            <Link to={"/"}>Anasayfa</Link>
          </li>
        </ul>
      )
    }

    else if(data.filepath.length > 0) {
      setLink(
        <ul>
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
      <div id="file_path_top" className="w-[calc(100%_-_70px)] top-11 left-[70px] absolute px-5 py-2 bg-shadow_green shadow-filepath breadcrumbs">
        {link}
      </div>
    </>
  )
}
