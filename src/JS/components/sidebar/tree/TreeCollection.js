import React , { useContext , useEffect } from 'react'
import { SidebarContext } from '../../context'
import TreeFolder from './TreeFolder'

export default function TreeCollection() {
  const treeData = useContext(SidebarContext);

  useEffect(() => {
    treeData.getTreeCollections();
  }, [])

  return (
    <>
      {treeData.treeCollections.owned.map((treeCollection) => (
        <div className='mb-3' key={treeCollection.id}>
          <span className="tree-elm pl-3"><i className="fa-solid fa-angle-right tree-cursor" id={"col_angle_" + treeCollection.id} onClick={() => treeData.treeToggle("col_" , treeCollection.id)}></i><i className="fa-solid fa-folder-tree mr-[6px] text-lg"></i>{treeCollection.name}</span>
        
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
