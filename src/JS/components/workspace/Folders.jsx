import React , { useContext , useEffect } from 'react'
import { Link , useParams } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { MainContext , ShareContext } from '../context'
import FoldCreator from './FoldCreator';

export default function Folders() {
	const data = useContext(MainContext);
  const share_data = useContext(ShareContext);
	const { colID } = useParams();

	useEffect(() => {		//. First check sharedCollections. Then if it equals to 0 run getShare func. Then run check func and show-hide check.
		data.funcLoad(data.getFolderWorks, parseInt(colID));
		
		if (share_data.sharedCollections.length === 0) {
			data.funcLoad(share_data.getShare);
		}
		
		check();
	}, [colID])

	useEffect(() => {
		check();
	}, [share_data.sharedCollections])

	const check = () => {
		if (share_data.sharedCollections.length !== 0) {

			for (let col of share_data.sharedCollections) {
				for (let dir of col.collection.directories) {
	
					if (dir.collection_id === parseInt(colID)) {
						if (col.editable === false) {
							share_data.setBtnShowHide(false);
							return;
						}
						else {
							share_data.setBtnShowHide(true);
						}
					}
	
				}
			}
		}

	}
	
	// const [ownColData, setownColData] = useState({directories: []}) //* ColID 'ye sahip olan koleksiyonun içerisindeki dosyaları çekmek için bunu oluşturduk

	// const getOwnCol = async (col_id = undefined) => { //*col_id ile hangi koleksiyonun içerisindeyse ondaki dosyaları getirmeyi amaçladık
  //   let resp = await WorkspaceAll.getCollections(col_id);
	// 	setownColData(resp.Data);
	// 	data.setFilePath([{id: col_id, name: resp.Data.collection_name, url: "/" + col_id}]);
  // }

  return (
		<div className='px-4 sm:px-5'>
			{!share_data.btnShowHide && data.folders.directories.length === 0 ?
				undefined
				:
				<>
					<h2 className="workspace-titles">Klasörler</h2>
					<div className="grid 2xl:grid-cols-9 xl:grid-cols-7 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4">

						{data.folders.directories.map((folder) => (
							
								<div key={folder.directory_id} className="fold-card col-span-1">
									<div className="card">

										{share_data.btnShowHide === true ?
											<div className='flex z-2 justify-end sm:gap-2 gap-3 mr-2'>
												<label htmlFor="sharemodal" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.openShareModal, "DIRECTORY" , folder.directory_id, folder.directory_name)}>
													<i className="fa-solid fa-share-nodes"></i>
												</label>
												<label htmlFor="addWorksFold" className="hidden sm:flex dlt-btn cursor-pointer h-7 justify-center items-center" onClick={() => data.funcLoad(data.getFolderDetails, folder)} >
													<i className="fa-solid fa-pen-to-square"></i>
												</label>
												<label htmlFor="dltWorks" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => {data.setDeleteItemRef(folder) ; data.setDeleteItemType("klasör")}}>
													<i className="fa-solid fa-xmark"></i>
												</label>
											</div>
										: undefined}

										<Link className='link-title' to={folder.directory_id.toString()}>
											<div className="col-content fold-content">
												<h5>{folder.directory_name}</h5>
											</div>
										</Link>
										<div className="card-bg fold-bg"></div>
									</div>
								</div>
						))}

						{share_data.btnShowHide === true ?
							<label htmlFor="addWorksFold" className="fold-card add col-span-1 hidden sm:block" onClick={() => data.clearRefs("klasör")}>
								<div className="card">
									<div className="col-content">
										<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
									</div>
								</div>
							</label>
						: undefined}

					</div>

					<hr className="hrCols"></hr>
				</>
			}

			<FoldCreator />
			<DeleteApply />
		</div>
  )
}
