import React , { useContext , useEffect } from 'react'
import { SidebarContext } from '../../context'

export default function TreeCollection() {
  const treeData = useContext(SidebarContext);
  console.log(treeData);

  useEffect(() => {
    treeData.getTreeCollections();
  }, [])


  return (
    <>
      {treeData.treeCollections.owned.map((treeCollection) => (
        <div key={treeCollection.id}>
          <div className='tree-elm'><i className="fa-solid fa-folder-tree mr-2"></i>{treeCollection.name}</div>
          
          {treeCollection.childs.map((child) => (
            <div key={child.id}className='tree-elm pl-6'>{child.name}</div>
          ))}

        </div>
      ))}

    </>
  )
}
