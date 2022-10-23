import React , { useState } from 'react'
import { SidebarContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';
import TreeCollection from './tree/TreeCollection';

export default function MainTree() {

  const [treeCollections, setTreeCollections] = useState({owned: []});
	
	const getTreeCollections = async () => {
    let resp = await WorkspaceAll.getTrees();
    setTreeCollections(resp.Data);
  }

  const treeToggle = (type , id) => {
    document.getElementById(type + id).classList.toggle('hidden');
    document.getElementById(type + "angle_" + id).classList.toggle('rotate-90');
  }
	
	const treeData = {
		treeCollections,
		getTreeCollections,
    treeToggle,
	}

  return (
		<SidebarContext.Provider value={treeData}>
			<div className='hrLine'>
				<div id="workspace-title" className="workspace-title">
					<span className="workspace-text">Çalışma Alanı</span>
				</div>
			</div>
			
			<div className='my-4'>
				<TreeCollection />
			</div>

		</SidebarContext.Provider>
  )
}
