import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ChartContext, MainContext } from '../context';

export default function Favorites(props) {
  const { allFavorites, favoriteFile, getFavorites, collections, funcLoadForSpesific } = useContext(MainContext);
  const { setPageContent } = useContext(ChartContext);

  const fn = props.fn; //? Dosya ağacındaki herhangi bir şeye tıklandığında sidebar kapanması için

	// useEffect(() => {
	// 	funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", getFavorites)
	// }, [])

  return (
		<>
			<div className='hrLine'>
				<div id="workspace-title" className="workspace-title items-center">
					<i className="fas fa-star mr-2"></i>
					<span className="workspace-text">Favoriler</span>
				</div>
			</div>

			<div className="my-4">
				{allFavorites.map((f, i) => {
					let col_name = "";

					for (let c of collections) {
						if (f.page.collection_id === c.collection_id) {
							col_name = "(" + c.collection_name + ")"
						}

					}

					return (
						<div key={i} className='relative' onClick={() => {fn; setPageContent({page_data : {panels: [], dragresize: false}});}}>
							<i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600 text-sm top-1/2 -translate-y-1/2 h-6 items-center cursor-pointer" onClick={() => funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", favoriteFile, f.page_id, "delete")} ></i>
							<Link to={f.url} className='mb-1'>
								<div className='tree-elm pl-3'>
									<label className="w-[200px] cursor-pointer truncate flex items-center">
										<i className="fa-solid fa-file mr-[6px] p-[5px]"></i>
										{f.page.page_name}
										<span className='text-xs text-onyx_light'>&nbsp; {col_name}</span>
									</label>
								</div>
							</Link>
						</div>
					)
				})}
			</div>
		</>
  )
}
