import React , { useContext , useEffect } from 'react'
import { SidebarContext } from '../../context'
import TreeFolder from './TreeFolder'
import { Link } from "react-router-dom";

export default function TreeCollection() {
  const treeData = useContext(SidebarContext);

  useEffect(() => {
    if (localStorage.getItem("Tree")) {
      let treeTime = parseInt(localStorage.getItem("TreeTime"))
      treeData.setTreeCollections(JSON.parse(localStorage.getItem("Tree")))

      if(Date.now() -  treeTime > (1 * 60 * 1000)) { //? Burada 5dk yı geçerse treedatayı yenilemesi için koyduk
        treeData.getTreeCollections();
      }
    }
    else {
      treeData.getTreeCollections();
    }
  }, [])

  return (
    <>
      {treeData.treeCollections.owned.map((treeCollection) => (
        <div className='mb-3' key={treeCollection.id}>
          <div className="tree-elm pl-3">
            <i className="fa-solid fa-angle-right tree-cursor absolute" id={"col_angle_" + treeCollection.id} onClick={(event) => treeData.treeToggle(event , "col_" , treeCollection.id )}></i>
            <Link className='w-full flex items-center ml-[34.75px]' to={treeCollection.id.toString()} onClick={treeData.fn}>
              <i className="fa-solid fa-folder-tree mr-[6px] text-lg"></i>{treeCollection.name}
            </Link>
          </div>
        
          <div id={"col_" + treeCollection.id} className="hidden">
            {treeCollection.childs.map((child) => (
              <div key={child.id}>
                <TreeFolder data={child} padding={12} />
              </div>
            ))}
          </div>
        </div>
      ))}

    </>
  )
}
