import React , { useState , useRef } from 'react'
import AddColFoldFile from './AddColFoldFile';

export default function Files({ files , getFileWorks}) {

	const worksNameRef = useRef(null);

	const [type, setType] = useState('');

	const addWorks = (type) => {
		worksNameRef.current.value = "";
		setType(type);
	}

  return (
  <>
		<h2 className="workspace-titles">Sayfalar</h2>
		<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">
  
		{files.map((file) => (

			<Link key={file.file_id} to={file.file_name}>
				<div id={file.file_id} className="fold-card  col-span-1">
					<div className="card">
						<button className="dlt-btn">
								<i className="fa-solid fa-xmark"></i>
						</button>
					<div className="card-bg file-bg"></div>
						<div className="col-content fold-content">
								<h5>{file.file_name}</h5>
						</div>
					</div>
				</div>
			</Link>

		))}
		
			<label htmlFor="addWorks" onClick={() => addWorks("sayfa")} className="fold-card add col-span-1">
				<div className="card">
					<div className="col-content">
						<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
					</div>
				</div>
			</label>
		</div>

		<AddColFoldFile type={type} worksNameRef={worksNameRef} getFileWorks={getFileWorks} />
	</>
  )
}
