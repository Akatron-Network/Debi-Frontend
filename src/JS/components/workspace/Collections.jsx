import React , { useContext , useEffect } from 'react'
import { Link } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { ChartContext, MainContext, ShareContext } from '../context'
import ColConnectorCreateor from './ColConnectorCreateor';

export default function Collections() {
  const data = useContext(MainContext);
  const { setPageContent } = useContext(ChartContext);
  const { getShare, sharedCollections, sharedDirectories, sharedPages } = useContext(ShareContext);

  useEffect(() => {
    data.getColWorks();
    data.funcLoad(data.getFavorites);
    getShare();
		data.setFilePath([]);

		if (screen.width < 641) {
			document.getElementById('back_btn').classList.add('hidden');
		}
		return () => { 
			if (document.getElementById('back_btn') !== null) {
				document.getElementById('back_btn').classList.remove('hidden') 
			}
		}
		
  }, [])

  return (
	<div className='px-4 sm:px-5'>
		<div id='dashboard' className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 sm:mt-6">
			<div className="dashboard-card">
				<h2 className="workspace-titles dashboard-card-title hrLine">
					<i className="fas fa-star mr-2"></i>
					Favoriler
				</h2>
				<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 !max-h-[230px] overflow-auto'>
					{data.allFavorites.map((f, i) => {
						let col_name = "";

						for (let c of data.collections) {
							if (f.page.collection_id === c.collection_id) {
								col_name = c.collection_name

								if (c.connector.gateway_host !== null && !data.gatewayClientCheck) {
	
									return (
										<div key={i} className={i < 3 ? "tooltip tooltip-bottom" : "tooltip tooltip-top"} data-tip="İstemci Gerektirir">
											<div className='relative col-span-1 opacity-30 pointer-events-none border border-danger_light rounded' onClick={() => {setPageContent({page_data : {panels: [], dragresize: false}});}}>
												<Link to={f.url} className='mb-1'>
													<div className='tree-elm dashboard-card-elm'>
														<label className="cursor-pointer truncate flex items-center">
															<i className="fa-solid fa-file mr-[6px] p-[5px] pl-[6px]"></i>
															{f.page.page_name}
															<span className='text-onyx_middle text-[13px]'>
																&nbsp; 
																(Koleksiyon: <span className='text-onyx_light'>{col_name}</span>)
															</span>
														</label>
													</div>
												</Link>
											</div>
										</div>
									)
								}
								else {
	
									return (
										<div key={i} className='relative col-span-1' onClick={() => {setPageContent({page_data : {panels: [], dragresize: false}});}}>
											<Link to={f.url} className='mb-1'>
												<div className='tree-elm dashboard-card-elm'>
													<label className="cursor-pointer truncate flex items-center">
														<i className="fa-solid fa-file mr-[6px] p-[5px] pl-[6px]"></i>
														{f.page.page_name}
														<span className='text-onyx_middle text-[13px]'>
															&nbsp; 
															(Koleksiyon: <span className='text-onyx_light'>{col_name}</span>)
														</span>
													</label>
												</div>
											</Link>
										</div>
									)
	
								}
							}
						}
					})}
				</div>
			</div>

			<div className="dashboard-card">
				<h2 className="workspace-titles dashboard-card-title hrLine">
					<i className="fas fa-people-arrows mr-2"></i>
					Benimle Paylaşılanlar
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">

					{sharedCollections.length > 0 ?
						<div className='dashboard-sub-card'>
							<div className='dashboard-card-sub-title'>
								<h1>Koleksiyonlar</h1>
							</div>
						
							<div className='w-full grid grid-cols-1 gap-2 mt-1'>
								{sharedCollections.map((col, i) => {
									let url = "/" + col.collection.collection_id.toString();		//. Get URL

									return(
										<div key={i} className='relative col-span-1'>
											<Link to={url} className='mb-1'>
												<div className='tree-elm dashboard-card-elm'>
													<label className="cursor-pointer truncate flex items-center">
														<i className="fa-solid fa-folder-tree mr-[6px] p-[5px] pl-[6px]"></i>
														{col.collection.collection_name}
														<span className='text-onyx_middle text-[13px]'>
															&nbsp; 
															(Paylaşan: <span className='text-onyx_light'>{col.shared_from}</span>)
														</span>
													</label>
												</div>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
						: undefined
					}

					{sharedDirectories.length > 0 ?
						<div className='dashboard-sub-card'>
							<div className='dashboard-card-sub-title'>
								<h1>Dosyalar</h1>
							</div>
						
							<div className='w-full grid grid-cols-1 gap-2 mt-1'>
								{sharedDirectories.map((dir, i) => {
									let c_url = dir.directory.collection_id.toString();
									let d_url = dir.directory.directory_id.toString();
									let url = "/" + c_url + "/" + d_url													//. Get URL
	
									return(
										<div key={i} className='relative col-span-1'>
											<Link to={url} className='mb-1'>
												<div className='tree-elm dashboard-card-elm'>
													<label className="cursor-pointer truncate flex items-center">
														<i className="fa-solid fa-folder mr-[6px] p-[5px] pl-[6px]"></i>
														{dir.directory.directory_name}
														<span className='text-onyx_middle text-[13px]'>
															&nbsp; 
															(Paylaşan: <span className='text-onyx_light'>{dir.shared_from}</span>)
														</span>
													</label>
												</div>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
						: undefined
					}
	
					{sharedPages.length > 0 ?
						<div className='dashboard-sub-card'>
							<div className='dashboard-card-sub-title'>
								<h1>Sayfalar</h1>
							</div>
						
							<div className='w-full grid grid-cols-1 gap-2 mt-1'>
								{sharedPages.map((page, i) => {
									let c_url = page.page.collection_id.toString();
									let d_url = page.page.directory_id.toString();
									let p_url = page.page.page_id.toString();
									let url = "/" + c_url + "/" + d_url + "/" + p_url 					//. Get URL 
	
									return(
										<div key={i} className='relative col-span-1'>
											<Link to={url} className='mb-1'>
												<div className='tree-elm dashboard-card-elm'>
													<label className="cursor-pointer truncate flex items-center">
														<i className="fa-solid fa-file mr-[6px] p-[5px] pl-[6px]"></i>
														{page.page.page_name}
														<span className='text-onyx_middle text-[13px]'>
															&nbsp; 
															(Paylaşan: <span className='text-onyx_light'>{page.shared_from}</span>)
														</span>
													</label>
												</div>
											</Link>
										</div>
									)
								})}
							</div>
						</div>
						: undefined
					}

				</div>

			</div>
			
		</div>
	
		<hr className="hrCols mt-6"></hr>

		<div id='collections'>
			<h2 className="workspace-titles">Koleksiyonlar</h2>
			<div className="grid 2xl:grid-cols-9 xl:grid-cols-7 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4">

				{data.collections.map((collection) => {
					return (
						<div key={collection.collection_id} className={collection.connector.gateway_host !== null && !data.gatewayClientCheck ? "col-span-1 opacity-40 pointer-events-none" : "col-span-1"}>
							<div className="card">
								<div className='flex z-2 justify-end sm:gap-2 gap-3 mr-2'>
									<label htmlFor="sharemodal" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.openShareModal, "COLLECTION", collection.collection_id, collection.collection_name)}>
										<i className="fa-solid fa-share-nodes"></i>
									</label>
									<label htmlFor="addWorksCol" className="hidden sm:flex dlt-btn cursor-pointer h-7 justify-center items-center" onClick={() => data.funcLoad(data.getCollectionDetails, collection)} >
										<i className="fa-solid fa-pen-to-square"></i>
									</label>
									<label htmlFor="dltWorks" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => {data.setDeleteItemRef(collection); data.setDeleteItemType("koleksiyon")}} >
										<i className="fa-solid fa-xmark"></i>
									</label>
								</div>
								<Link className='link-title' to={collection.collection_id.toString()}>
									<div className="col-content">
										<h4>{collection.collection_name}</h4>
									</div>
								</Link>
								{collection.connector.gateway_host !== null && !data.gatewayClientCheck ? 
									<span className='text-sm truncate bg-danger_light text-white z-2 absolute bottom-0 w-full text-center font-bold'>İstemci Gerektirir<br /></span> 
									: 
									undefined
								}
								<div className="card-bg" />
							</div>
						</div>
				)})}
				{/* EDİTE BASINCA EDİT MODU AÇILSIN VE KOLEKSİYON OLUŞTURMA DOLDURULSUN - EKSTRA SENKRONİZASYON DA DURUMUNU GÖSTER VE BUTONU KOY*/}

				<label id='addCollection' className='hidden sm:block add col-span-1' htmlFor="addWorksCol" onClick={() => data.clearRefs("koleksiyon")}>
					<div className="card">
						<div className="col-content">
							<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
						</div>
					</div>
				</label>
				
			</div>
		</div>

		<ColConnectorCreateor />
		<DeleteApply />
	</div>
  )
}
