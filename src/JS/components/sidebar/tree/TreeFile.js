import React , { useContext} from 'react'
import { SidebarContext } from '../../context'
import TreeFolder from './TreeFolder'
import { Link } from "react-router-dom";

export default function TreeFile(props) {
  const treeData = useContext(SidebarContext);

  const checkType = (data) => {
    if(data.type === "page") {
      return (
        <Link to={data.url.toString()}  className='tree-elm' style={{paddingLeft: (props.padding + 51.75) + "px"}}><i className="fa-solid fa-file mr-[6px]"></i>{data.name}</Link>
      )
    }
    else if(data.type === "directory") {
      return (
        <>
          <div className="tree-elm pl-3" style={{paddingLeft: (props.padding + 16) + "px"}}>
            <i className="fa-solid fa-angle-right tree-cursor absolute" id={"fold_angle_" + data.id} onClick={(event) => treeData.treeToggle(event , "fold_" , data.id)}></i>
            <Link to={data.url.toString()} className='w-full flex items-center ml-[34.75px]' onClick={treeData.fn}>
              <i className="fa-solid fa-folder mr-[6px]"></i>{data.name}
            </Link>
          </div>

          <div id={"fold_" + data.id} className="hidden">
            {data.childs.map(function (child) {
              return(
                <div key={child.id}>
                  <TreeFolder data={child} padding={props.padding + 16} />
                </div>
            )})}
          </div>
        </>
      )
    }
  }
  return (
    <>{checkType(props.data)}</>
  )
}
