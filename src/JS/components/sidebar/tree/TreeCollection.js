import React , { useContext , useEffect } from 'react'
import { SidebarContext } from '../../context'
import TreeFolder from './TreeFolder'

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
          <span className="tree-elm pl-3">
            <i className="fa-solid fa-angle-right tree-cursor" id={"col_angle_" + treeCollection.id} onClick={() => treeData.treeToggle("col_" , treeCollection.id)}></i>
            <i className="fa-solid fa-folder-tree mr-[6px] text-lg"></i>{treeCollection.name}
          </span>
        
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
