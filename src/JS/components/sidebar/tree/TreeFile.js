import React , { useContext} from 'react'
import { SidebarContext } from '../../context'
import TreeFolder from './TreeFolder'

export default function TreeFile(props) {
  const treeData = useContext(SidebarContext);

  const checkType = (data) => {
    if(data.type === "page") {
      return (
        <span className='tree-elm' style={{paddingLeft: (props.padding + 51.75) + "px"}}><i className="fa-solid fa-file mr-[6px]"></i>{data.name}</span>
      )
    }
    else if(data.type === "directory") {
      return (
        <>
        <span className='tree-elm' style={{paddingLeft: (props.padding + 16) + "px"}}>
          <i className="fa-solid fa-angle-right tree-cursor" id={"fold_angle_" + data.id} onClick={() => treeData.treeToggle("fold_" , data.id)}></i>
          <i className="fa-solid fa-folder mr-[6px]"></i>{data.name}
        </span>

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
