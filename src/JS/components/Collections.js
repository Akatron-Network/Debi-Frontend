import React , { useState , useRef } from 'react'
import { Link } from "react-router-dom";
import AddColFoldFile from './AddColFoldFile';

export default function Collections({ collections , getColWorks }) {

	const worksNameRef = useRef(null);

	const [type, setType] = useState('');

	const addWorks = (type) => {
		worksNameRef.current.value = "";
		setType(type);
	}
	
  return (
	<>
		<h2 className="workspace-titles">Koleksiyonlar</h2>
		<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{collections.map((collection) => (

				<Link key={collection.collection_id} to={collection.collection_name}>
					<div id={collection.collection_id} className="col-card col-span-1">
						<div className="card">
							<button className="dlt-btn" id={collection.collection_id}>
								<i className="fa-solid fa-xmark"></i>
							</button>
							<div className="card-bg" />
							<div className="col-content">
								<h4>{collection.collection_name}</h4>
							</div>
						</div>
					</div>
				</Link>
			))}

			<label htmlFor="addWorks" onClick={() => addWorks("koleksiyon")}>
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

		<AddColFoldFile type={type} worksNameRef={worksNameRef} getColWorks={getColWorks} />
	</>
  )
}
