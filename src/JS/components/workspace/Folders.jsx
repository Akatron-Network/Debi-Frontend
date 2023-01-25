import React , { useContext , useEffect } from 'react'
import { Link , useParams } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { MainContext } from '../context'
import FoldCreator from './FoldCreator';

export default function Folders() {

	const data = useContext(MainContext);
	
	const { colID } = useParams();

	useEffect(() => {
		data.getFolderWorks(parseInt(colID));
	}, [colID])

	// const [ownColData, setownColData] = useState({directories: []}) //* ColID 'ye sahip olan koleksiyonun içerisindeki dosyaları çekmek için bunu oluşturduk

	// const getOwnCol = async (col_id = undefined) => { //*col_id ile hangi koleksiyonun içerisindeyse ondaki dosyaları getirmeyi amaçladık
  //   let resp = await WorkspaceAll.getCollections(col_id);
	// 	setownColData(resp.Data);
	// 	data.setFilePath([{id: col_id, name: resp.Data.collection_name, url: "/" + col_id}]);
  // }

  return (
		<>
			<h2 className="workspace-titles">Klasörler</h2>
			<div className="grid xl:grid-cols-10 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

				{data.folders.directories.map((folder) => (
					
					
						<div key={folder.directory_id} className="fold-card col-span-1">
							<div className="card">
								<div className='flex z-2 pt-[6px] justify-end gap-3 pr-2'>
									<label htmlFor="sharemodal" className="dlt-btn cursor-pointer">
										<i className="fa-solid fa-share-nodes"></i>
									</label>
									<label htmlFor="dltWorks" className="dlt-btn cursor-pointer" onClick={() => {data.setDeleteItemRef(folder) ; data.setDeleteItemType("klasör")}}>
										<i className="fa-solid fa-xmark"></i>
									</label>
								</div>
								<Link className='link-title' to={folder.directory_id.toString()}>
									<div className="col-content fold-content">
										<h5>{folder.directory_name}</h5>
									</div>
								</Link>
								<div className="card-bg fold-bg"></div>
							</div>
						</div>
				))}

				<label htmlFor="addWorksFold" className="fold-card add col-span-1" onClick={() => data.clearRefs("klasör")}>
					<div className="card">
						<div className="col-content">
							<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
						</div>
					</div>
				</label>

			</div>

			<hr className="hrCols"></hr>

			<FoldCreator />
			<DeleteApply />
		</>
  )
}
