import React from 'react'
import { Link } from "react-router-dom";

export default function Collections({ collections }) {
	
  return (

		collections.map(collection =>

			<Link key={collection.collection_id} to={collection.collection_id.toString()}>
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
			
			
		)
  )
}
