import React , { useContext , useEffect } from 'react'
import { Link } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { MainContext } from '../context'
import ColConnectorCreateor from './ColConnectorCreateor';

export default function Collections() {
  const data = useContext(MainContext);

  useEffect(() => {
    data.getColWorks();
		data.setFilePath([]);
  }, [])

  return (
	<>
		<h2 className="workspace-titles">Koleksiyonlar</h2>
		<div className="grid xl:grid-cols-10 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{data.collections.map((collection) => (
					<div key={collection.collection_id} className="col-card col-span-1">
						<div className="card">
							<div className='flex z-2 pt-[6px] justify-end gap-3 pr-2'>
								<label htmlFor="sharemodal" className="dlt-btn cursor-pointer" onClick={() => data.openShareModal("COLLECTION", collection.collection_id, collection.collection_name)}>
									<i className="fa-solid fa-share-nodes"></i>
								</label>
								<label htmlFor="dltWorks" className="dlt-btn cursor-pointer" onClick={() => {data.setDeleteItemRef(collection) ; data.setDeleteItemType("koleksiyon")}} >
									<i className="fa-solid fa-xmark"></i>
								</label>
							</div>
              <Link className='link-title' to={collection.collection_id.toString()}>
                <div className="col-content">
								  <h4>{collection.collection_name}</h4>
							  </div>
              </Link>
							<div className="card-bg" />
						</div>
					</div>
			))}

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
