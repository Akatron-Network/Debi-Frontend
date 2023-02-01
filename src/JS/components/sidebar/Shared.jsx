import React , { useContext, useEffect } from 'react'
import { ShareContext } from '../context'
import { Link } from 'react-router-dom';

export default function Shared() {
  const share_data = useContext(ShareContext);
	console.log(share_data)

	useEffect(() => {
		share_data.getShare();	
	}, [])
	

  return (
		<>
			<div className='hrLine'>
				<div id="workspace-title" className="workspace-title h">
					<span className="workspace-text">Benimle Paylaşılanlar</span>
				</div>
			</div>
			
			<div className='my-4'>

				<div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Koleksiyonlar</h1>
					<hr className="my-3 ml-2 border-1 w-full border-onyx" />
				</div>
				
				{share_data.sharedCollections.map((col, index) => {
					let url = "/" + col.collection.collection_id.toString();		//. Get URL

					return(
						<Link to={url} className='mb-1' key={index}>
							<div className='tree-elm pl-3'>
								<label htmlFor="sharemodal" onClick={() => share_data.opClSideBar()} className="w-[200px] cursor-pointer truncate flex items-center"><i className="fa-solid fa-folder-tree mr-2 p-[5px]"></i>{col.collection.collection_name} <span className='text-onyx_middle text-[13px]'> &nbsp; (Paylaşan: <span className='text-onyx_light'>{col.shared_from}</span>)</span> </label>
								{/* <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600"></i> */}
							</div>
						</Link>
					)
				})}

				<div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Dosyalar</h1>
					<hr className="my-3 ml-2 border-1 w-full border-onyx" />
				</div>				

				{share_data.sharedDirectories.map((dir, index) => {
					let c_url = dir.directory.collection_id.toString();
					let d_url = dir.directory.directory_id.toString();
					let url = "/" + c_url + "/" + d_url													//. Get URL 
					
					return(
						<Link to={url} className='mb-1' key={index}>
							<div className='tree-elm pl-3'>
								<label htmlFor="sharemodal" onClick={() => share_data.opClSideBar()} className="w-[200px] cursor-pointer truncate flex items-center"><i className="fa-solid fa-folder mr-2 p-[5px]"></i>{dir.directory.directory_name} <span className='text-onyx_middle text-[13px]'> &nbsp; (Paylaşan: <span className='text-onyx_light'>{dir.shared_from}</span>)</span> </label>
								{/* <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600"></i> */}
							</div>
						</Link>
					)
				})}
				
				<div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Sayfalar</h1>
					<hr className="my-3 ml-2 border-1 w-full border-onyx" />
				</div>

				{share_data.sharedPages.map((page, index) => {
					let c_url = page.page.collection_id.toString();
					let d_url = page.page.directory_id.toString();
					let p_url = page.page.page_id.toString();
					let url = "/" + c_url + "/" + d_url + "/" + p_url 					//. Get URL 

					return(
						<Link to={url} className='mb-1' key={index}>
							<div className='tree-elm pl-3'>
								<label htmlFor="sharemodal" onClick={() => share_data.opClSideBar()} className="w-[200px] cursor-pointer truncate flex items-center"><i className="fa-solid fa-file mr-2 p-[5px]"></i>{page.page.page_name} <span className='text-onyx_middle text-[13px]'> &nbsp; (Paylaşan: <span className='text-onyx_light'>{page.shared_from}</span>)</span> </label>
								{/* <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600"></i> */}
							</div>
						</Link>
					)

				})}
			
			</div>
		</>
  )
}
