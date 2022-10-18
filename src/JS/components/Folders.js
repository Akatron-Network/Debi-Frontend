import React , { useState , useRef } from 'react'
import { Link } from "react-router-dom";
import AddColFoldFile from './AddColFoldFile';

export default function Folders({ folders , getFolderWorks }) {

	const worksNameRef = useRef(null);

	const [type, setType] = useState('');

	const addWorks = (type) => {
		worksNameRef.current.value = "";
		setType(type);
	}

  return (
	<>
		<h2 className="workspace-titles">Klasörler</h2>
		<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{folders.map((folder) => (

				<Link key={folder.folder_id} to={folder.folder_name}>
					<div id={folder.folder_id}  className="fold-card col-span-1">
						<div className="card">
							<button className="dlt-btn">
									<i className="fa-solid fa-xmark"></i>
							</button>
							<div className="card-bg fold-bg"></div>
							<div className="col-content fold-content">
									<h5>{folder.folder_name}</h5>
							</div>
						</div>
					</div>
				</Link>
			))}

			<label htmlFor="addWorks" onClick={() =>addWorks("klasör")} className="fold-card add col-span-1">
				<div className="card">
					<div className="col-content">
						<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
					</div>
				</div>
			</label>

		</div>

		<hr className="hrCols"></hr>

		<AddColFoldFile type={type} worksNameRef={worksNameRef} getFolderWorks={getFolderWorks} />
  </>
  )
}
