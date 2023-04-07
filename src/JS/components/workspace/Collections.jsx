import React , { useContext , useEffect } from 'react'
import { Link } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { MainContext } from '../context'
import ColConnectorCreateor from './ColConnectorCreateor';

export default function Collections() {
  const data = useContext(MainContext);

  useEffect(() => {
    data.funcLoad(data.getColWorks);
		data.funcLoad(data.setFilePath, []);
  }, [])

  return (
	<>
		<h2 className="workspace-titles">Koleksiyonlar</h2>
		<div className="grid 2xl:grid-cols-9 xl:grid-cols-7 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{data.collections.map((collection) => (
					<div key={collection.collection_id} className={collection.connector.gateway_host === null ? "col-card col-span-1" : "col-card col-span-1 opacity-50 pointer-events-none"}>
						<div className="card">
							<div className='flex z-2 justify-end'>
								<label htmlFor="sharemodal" className="dlt-btn cursor-pointer ml-[6px] h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.openShareModal, "COLLECTION", collection.collection_id, collection.collection_name)}>
									<i className="fa-solid fa-share-nodes"></i>
								</label>
								<label htmlFor="addWorksCol" className="dlt-btn cursor-pointer ml-[6px] h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.getCollectionDetails, collection)} >
									<i className="fa-solid fa-pen-to-square"></i>
								</label>
								<label htmlFor="dltWorks" className="dlt-btn cursor-pointer mx-[6px] h-7 flex justify-center items-center" onClick={() => {data.setDeleteItemRef(collection) ; data.setDeleteItemType("koleksiyon")}} >
									<i className="fa-solid fa-xmark"></i>
								</label>
							</div>
              <Link className='link-title' to={collection.collection_id.toString()}>
                <div className="col-content">
								  <h4>{collection.collection_name}</h4>
							  </div>
              </Link>
							{collection.connector.gateway_host !== null ? 
								<span className='text-sm truncate bg-danger_light text-white z-2 absolute bottom-0 w-full text-center font-bold'>İstemci Gerektirir<br /></span> 
								: undefined
							}
							<div className="card-bg" />
						</div>
					</div>
			))}
			{/* EDİTE BASINCA EDİT MODU AÇILSIN VE KOLEKSİYON OLUŞTURMA DOLDURULSUN - EKSTRA SENKRONİZASYON DA DURUMUNU GÖSTER VE BUTONU KOY*/}

			<label htmlFor="addWorksCol" onClick={() => data.clearRefs("koleksiyon")}>
				<div className="col-card add col-span-1">
					<div className="card">
						<div className="col-content">
							<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
						</div>
					</div>
				</div>
			</label>
			
		</div>
	
		<hr className="hrCols"></hr>

		<ColConnectorCreateor />
		<DeleteApply />
	</>
  )
}
