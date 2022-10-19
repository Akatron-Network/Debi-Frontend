import React , { useContext , useEffect } from 'react'
import { Link , useParams } from "react-router-dom";
import AddColFoldFile from './AddColFoldFile';

import { MainContext } from './context'

export default function Folders() {
	
	const { colID } = useParams();

	useEffect(() => {
	  data.getFolderWorks();
	}, [])

	const data = useContext(MainContext);

  return (
	<>
		<h2 className="workspace-titles">Klasörler</h2>
		<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{data.folders.map((folder) => (
				
				<Link key={folder.directory_id} to={folder.directory_name}>
					<div id={folder.directory_id}  className="fold-card col-span-1">
						<div className="card">
							<button className="dlt-btn">
									<i className="fa-solid fa-xmark"></i>
							</button>
							<div className="card-bg fold-bg"></div>
							<div className="col-content fold-content">
									<h5>{folder.directory_name}</h5>
							</div>
						</div>
					</div>
				</Link>
			))}

			<label htmlFor="addWorks" onClick={() =>data.addWorks("klasör")} className="fold-card add col-span-1">
				<div className="card">
					<div className="col-content">
						<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
					</div>
				</div>
			</label>

		</div>

		<hr className="hrCols"></hr>
		
		Burası koleksiyon: {colID}

		<AddColFoldFile />
  </>
  )
}
