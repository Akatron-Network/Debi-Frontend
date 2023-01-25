import React , { useContext } from 'react'
import { ShareContext } from '../context'

export default function Shared() {
  const share_data = useContext(ShareContext);
	console.log(share_data)
  return (
		<>
			<div className='hrLine'>
				<div id="workspace-title" className="workspace-title h">
					<span className="workspace-text">Benimle Paylaşılanlar</span>
				</div>
			</div>
			
			<div className='my-4'>
				
				<div className='mb-1'>
					<div className='tree-elm pl-3'>
						<label htmlFor="sharemodal" className="w-[200px] cursor-pointer truncate flex items-center"><i className="fa-solid fa-share-nodes mr-2 p-[5px]"></i>Deneme</label>
						<i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-danger_light"></i>
					</div>
				</div>
			
			</div>
		</>
  )
}
