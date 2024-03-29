import React , { useContext , useEffect } from 'react'
import { Link , useParams } from "react-router-dom";
import DeleteApply from './DeleteApply';
import { MainContext , ShareContext } from '../context'
import FoldCreator from './FoldCreator';
import FileCreator from './FileCreator';

export default function Files() {
  const share_data = useContext(ShareContext);
	const data = useContext(MainContext);
	const { foldID } = useParams();

	useEffect(() => {		//. First check sharedCollections and sharedDirectories. Then if it equals to 0 run getShare func. Then run check func and show-hide check.
	  data.funcLoad(data.getFileWorks, parseInt(foldID));

		if (share_data.sharedCollections.length === 0) {
			if (share_data.sharedDirectories.length === 0) {
				data.funcLoad(share_data.getShare);
			}
		}
		
		check();

	}, [foldID])

	useEffect(() => {
		check();
	}, [share_data.sharedCollections, share_data.sharedDirectories])
	

	useEffect(() => {
		data.getFavorites()

		return () => {
			data.setAllFavorites([]);
		}
	}, [])
	

	const check = () => {	//. Check sharedCollections and sharedDirectories
		
		if (share_data.sharedCollections.length !== 0) {

			for (let col of share_data.sharedCollections) {
				for (let dir of col.collection.directories) {
	
					if (dir.directory_id === parseInt(foldID)) {
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

		if (share_data.sharedDirectories.length !== 0) {

			for (let dir of share_data.sharedDirectories) {

				if (dir.directory_id === parseInt(foldID)) {
					if (dir.editable === false) {
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

  return (
		<div className='px-4 sm:px-5'>
			{!share_data.btnShowHide && data.filesChildDirs.child_dirs.length === 0 ?
				undefined
				:
				<>
					<h2 className="workspace-titles">Klasörler</h2>
					<div className="grid 2xl:grid-cols-9 xl:grid-cols-7 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4">
		
						{data.filesChildDirs.child_dirs.map((folder) => (
		
							<div key={folder.directory_id} className="fold-card col-span-1">
								<div className="card">
		
									{share_data.btnShowHide === true ?
										<div className='flex z-2 justify-end sm:gap-2 gap-3  mr-2'>
											<label htmlFor="sharemodal" className="dlt-btn cursor-pointer ml-[6px] h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.openShareModal, "DIRECTORY" , folder.directory_id, folder.directory_name)}>
												<i className="fa-solid fa-share-nodes"></i>
											</label>
											<label htmlFor="addWorksFold" className="hidden sm:flex dlt-btn cursor-pointer ml-[6px] h-7 justify-center items-center" onClick={() => data.funcLoad(data.getFolderDetails, folder)} >
												<i className="fa-solid fa-pen-to-square"></i>
											</label>
											<label htmlFor="dltWorks" className="dlt-btn cursor-pointer mx-1 h-7 flex justify-center items-center ml-3 sm:ml-0" onClick={() => {data.setDeleteItemRef(folder) ; data.setDeleteItemType("klasör")}}>
												<i className="fa-solid fa-xmark"></i>
											</label>
										</div>
									: undefined}
		
									<Link className='link-title' to={"/" + folder.collection_id.toString() + "/" + folder.directory_id.toString()}>
										<div className="col-content fold-content">
											<h5>{folder.directory_name}</h5>
										</div>
									</Link>
									<div className="card-bg fold-bg"></div>
								</div>
							</div>
						))}
		
						{share_data.btnShowHide === true ?
							<label htmlFor="addWorksFold" className="fold-card add col-span-1 hidden sm:block"  onClick={() => data.clearRefs("klasör")}>
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

			{!share_data.btnShowHide && data.files.pages.length === 0 ?
				undefined
				:
				<>
					<h2 className="workspace-titles">Sayfalar</h2>
					<div className="grid 2xl:grid-cols-9 xl:grid-cols-7 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4">
						{data.files.pages.map((file) => {				
							return (
								<div key={file.page_id} className="fold-card  col-span-1">
									<div className="card">

										{share_data.btnShowHide === true ?
											<div className='flex justify-end sm:gap-2 gap-3 z-2 mr-2'>
												<label className="dlt-btn cursor-pointer h-7 flex justify-center items-center"  ref={(el) => {data.favoriteRef.current[file.page_id] = el}} onClick={() => data.favoriteFile(file.page_id)}>
													<i className="fas fa-star"></i>
												</label>
												<label htmlFor="sharemodal" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => data.funcLoad(data.openShareModal, "PAGE" , file.page_id, file.page_name)}>
													<i className="fa-solid fa-share-nodes"></i>
												</label>
												<label htmlFor="addWorksFile" className="hidden sm:flex dlt-btn cursor-pointer h-7 justify-center items-center" onClick={() => data.funcLoad(data.getFileDetails, file)} >
													<i className="fa-solid fa-pen-to-square"></i>
												</label>
												<label htmlFor="dltWorks" className="dlt-btn cursor-pointer h-7 flex justify-center items-center" onClick={() => {data.setDeleteItemRef(file) ; data.setDeleteItemType("sayfa")}}>
													<i className="fa-solid fa-xmark"></i>
												</label>
											</div>
										: undefined}
										
										<div className="card-bg file-bg"></div>
										<Link className='link-title' to={file.page_id.toString()}>
											<div className="col-content fold-content">
												<h5>{file.page_name}</h5>
											</div>
										</Link>
									</div>
								</div>
						)})}

						{share_data.btnShowHide === true ?
							<label htmlFor="addWorksFile" className="fold-card add col-span-1 hidden sm:block"  onClick={() => data.clearRefs("sayfa")}>
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
			<FileCreator />
			<DeleteApply />
		</div>
  )
}
