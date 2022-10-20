import React , { useContext , useState , useEffect } from 'react'
import { Link } from "react-router-dom";
import { MainContext } from './context'

export default function Filepath() {
  const data = useContext(MainContext);
  console.log(data);

  const [link, setLink] = useState()

  const getLink = () => {
    // if(data.filepath.length > 1) {
    //   console.log(data.filepath.length)
    // }
  }
  console.log(data.filepath.length)
  

  return (
    <>

    


    <div id="file_path_top" className="w-[calc(100%_-_70px)] top-11 left-[70px] absolute px-5 py-2 bg-shadow_green shadow-filepath breadcrumbs">
        <ul>
            {data.filepath.map((path) => (
              
             
                <li key={path.id} id={path.id} className="file-path-top-text">
                  <Link to={ "/" + data.filepath[0].id + "/" + path.id.toString()}>
                    {path.name}
                  </Link>
                </li>
              
            ))}

            {/* <li id="file-path_top_text" className="file-path-top-text"><a href="">Akatron Network</a></li>
            <li id="file-path_top_text" className="file-path-top-text"><a href="">Frontend</a></li>
            <li id="file-path_top_text" className="file-path-top-text"><a href="">madafaka.js</a></li> */}

        </ul>
    </div>
    
    </>
  )
}
