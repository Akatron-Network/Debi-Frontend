import React , { useContext , useEffect , useState } from 'react'
import { Link , useParams } from "react-router-dom";
import AddColFoldFile from './AddColFoldFile';
import DeleteApply from './DeleteApply';
import { MainContext } from './context'

export default function Files() {

	const data = useContext(MainContext);
	
	const { foldID } = useParams();

	useEffect(() => {
	  data.getFileWorks(parseInt(foldID));
	}, [foldID])

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
			<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

				{data.filesChildDirs.child_dirs.map((folder) => (
					
					
						<div key={folder.directory_id} className="fold-card col-span-1">
							<div className="card">
								<label htmlFor="dltWorks" className="dlt-btn cursor-pointer"  onClick={() => {data.setDeleteItemRef(folder) ; data.setDeleteItemType("klasör")}}>
										<i className="fa-solid fa-xmark"></i>
								</label>
								<Link className='link-title' to={"/" + folder.collection_id.toString() + "/" + folder.directory_id.toString()}>
									<div className="col-content fold-content">
										<h5>{folder.directory_name}</h5>
									</div>
								</Link>
								<div className="card-bg fold-bg"></div>
							</div>
						</div>
				))}

				<label htmlFor="addWorks" onClick={() =>data.addWorks("klasör")} className="fold-card add col-span-1">
					<div className="card">
						<div className="col-content">
							<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
						</div>
					</div>
				</label>

			</div>

			<hr className="hrCols"></hr>

			<h2 className="workspace-titles">Sayfalar</h2>
			<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">
				{data.files.pages.map((file) => (

					
						<div key={file.page_id} className="fold-card  col-span-1">
							<div className="card">
								<label htmlFor="dltWorks" className="dlt-btn cursor-pointer" onClick={() => {data.setDeleteItemRef(file) ; data.setDeleteItemType("sayfa")}}>
										<i className="fa-solid fa-xmark"></i>
								</label>
								<div className="card-bg file-bg"></div>
								<Link className='link-title' to={file.page_id.toString()}>
									<div className="col-content fold-content">
										<h5>{file.page_name}</h5>
									</div>
								</Link>
							</div>
						</div>
				))}
				
				<label htmlFor="addWorks" onClick={() => data.addWorks("sayfa")} className="fold-card add col-span-1">
					<div className="card">
						<div className="col-content">
							<i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
						</div>
					</div>
				</label>
			</div>

			<hr className="hrCols"></hr>

			<AddColFoldFile />
			<DeleteApply />
		</>
  )
}
