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

	useEffect(() => {		//. First check sharedCollections. Then if it equals to 0 run getShare func. Then run check func and show-hide check.
	  data.getFileWorks(parseInt(foldID));

		if (share_data.sharedDirectories.length === 0) {
			share_data.getShare();
		}
		else { check() }

	}, [foldID])

	useEffect(() => {
		check();
	}, [share_data.sharedDirectories])

	const check = () => {	//. If sharedCol have directory show - hide return to false;

		for (let col of share_data.sharedCollections) {
			for (let dir of col.collection.directories) {

				if (dir.directory_id === parseInt(foldID)) {
					if (col.editable === false) {	//. Check editable
						share_data.setBtnShowHide(false);
						return;
					}
				}
				else {
					share_data.setBtnShowHide(share_data.btnShowHide);
				}

			}
		}
	}

	// const [ownFoldID, setOwnFoldID] = useState({pages: []}) //* FoldID 'ye sahip olan dosyanın içerisindeki sayfaları çekmek için bunu oluşturduk
	// const [childFoldID, setChildFoldID] = useState({child_dirs: []}) //* FoldID 'ye sahip olan dosyanın içerisindeki dosyaları çekmek için bunu oluşturduk

	// const getOwnFold = async (fold_id = undefined) => {
  //   let resp = await WorkspaceAll.getFolders(fold_id);
	// 	setChildFoldID(resp.Data)
	// 	setOwnFoldID(resp.Data)
	// 	data.setFilePath(resp.Data.path)
  // }

  return (
		<>
			<h2 className="workspace-titles">Klasörler</h2>
			<div className="grid xl:grid-cols-10 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

				{data.filesChildDirs.child_dirs.map((folder) => (

					<div key={folder.directory_id} className="fold-card col-span-1">
						<div className="card">

							{share_data.btnShowHide === true ?
								<div className='flex z-2 pt-[6px] justify-end gap-3 pr-2'>
									<label htmlFor="sharemodal" className="dlt-btn cursor-pointer" onClick={() => data.openShareModal("DIRECTORY" , folder.directory_id, folder.directory_name)}>
										<i className="fa-solid fa-share-nodes"></i>
									</label>
									<label htmlFor="dltWorks" className="dlt-btn cursor-pointer"  onClick={() => {data.setDeleteItemRef(folder) ; data.setDeleteItemType("klasör")}}>
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
					<label htmlFor="addWorksFold" className="fold-card add col-span-1"  onClick={() => data.clearRefs("klasör")}>
						<div className="card">
							<div className="col-content">
								<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
							</div>
						</div>
					</label>
				: undefined}

			</div>

			<hr className="hrCols"></hr>

			<h2 className="workspace-titles">Sayfalar</h2>
			<div className="grid xl:grid-cols-10 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">
				{data.files.pages.map((file) => (

					<div key={file.page_id} className="fold-card  col-span-1">
						<div className="card">

							{share_data.btnShowHide === true ?
								<div className='flex z-2 pt-[6px] justify-end gap-3 pr-2'>
									<label htmlFor="sharemodal" className="dlt-btn cursor-pointer" onClick={() => data.openShareModal("PAGE" , file.page_id, file.page_name)}>
										<i className="fa-solid fa-share-nodes"></i>
									</label>
									<label htmlFor="dltWorks" className="dlt-btn cursor-pointer" onClick={() => {data.setDeleteItemRef(file) ; data.setDeleteItemType("sayfa")}}>
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
				))}

				{share_data.btnShowHide === true ?
					<label htmlFor="addWorksFile" className="fold-card add col-span-1"  onClick={() => data.clearRefs("sayfa")}>
						<div className="card">
							<div className="col-content">
								<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
							</div>
						</div>
					</label>
				: undefined}
			</div>

			<hr className="hrCols"></hr>

			<FoldCreator />
			<FileCreator />
			<DeleteApply />
		</>
  )
}
