import React from 'react'

export default function Files({files}) {

  return (
  
		files.map(file =>

			<div key={file.id} id={file.id} className="fold-card  col-span-1">
				<div className="card">
					<button className="dlt-btn">
							<i className="fa-solid fa-xmark"></i>
					</button>
				<div className="card-bg file-bg"></div>
					<div className="col-content fold-content">
							<h5>{file.name}</h5>
					</div>
				</div>
			</div>
		)
  )
}
