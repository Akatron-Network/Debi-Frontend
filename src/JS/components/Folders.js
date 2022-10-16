import React from 'react'

export default function Folders({folders}) {

  return (
  
    folders.map(folder =>

			<div key={folder.id} id={folder.id}  className="fold-card col-span-1">
				<div className="card">
					<button className="dlt-btn">
							<i className="fa-solid fa-xmark"></i>
					</button>
					<div className="card-bg fold-bg"></div>
					<div className="col-content fold-content">
							<h5>{folder.name}</h5>
					</div>
				</div>
			</div>
    )
  )
}
