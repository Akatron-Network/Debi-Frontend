import React  from 'react'
import { SidebarContext } from '../context'
import TreeCollection from './tree/TreeCollection';

export default function MainTree(props) {

  const treeToggle = (event , type , id ) => {
    event.preventDefault();
    document.getElementById(type + id).classList.toggle('hidden');
    document.getElementById(type + "angle_" + id).classList.toggle('rotate-90');
  }
	
  const fn = props.fn; //? Dosya ağacındaki herhangi bir şeye tıklandığında sidebar kapanması için

	const treeData = {
    treeToggle,
    fn,
	}

  return (
		<SidebarContext.Provider value={treeData}>
			<div className='hrLine'>
				<div id="workspace-title" className="workspace-title items-center">
					<i className="fas fa-sitemap mr-2"></i>
					<span className="workspace-text">Çalışma Alanı</span>
				</div>
			</div>
			
			<div className='my-4'>
				<TreeCollection />
			</div>

		</SidebarContext.Provider>
  )
}
