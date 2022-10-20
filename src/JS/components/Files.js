import React , { useContext , useEffect , useState } from 'react'
import { Link , useParams } from "react-router-dom";
import AddColFoldFile from './AddColFoldFile';
import WorkspaceAll from '../libraries/categories/Workspace';
import { MainContext } from './context'

export default function Files() {

	const data = useContext(MainContext);
	
	const { foldID } = useParams();

	useEffect(() => {
	  getOwnFold(parseInt(foldID));
	}, [foldID])

	const [ownFoldID, setOwnFoldID] = useState([]) //* FoldID 'ye sahip olan dosyanın içerisindeki sayfaları çekmek için bunu oluşturduk
	const [childFoldID, setChildFoldID] = useState([]) //* FoldID 'ye sahip olan dosyanın içerisindeki dosyaları çekmek için bunu oluşturduk

	const getOwnFold = async (fold_id = undefined) => {
    let resp = await WorkspaceAll.getFolders(fold_id);
		setOwnFoldID(resp.Data.pages)
		setChildFoldID(resp.Data.child_dirs)
		data.setFilePath(resp.Data.path)
  }

  return (
  <>
		<h2 className="workspace-titles">Klasörler</h2>
		<div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 grid-flow-row auto-rows-max gap-4 pl-[10px]">

			{childFoldID.map((folder) => (
				
				<Link key={folder.directory_id} to={"/" + folder.collection_id.toString() + "/" + folder.directory_id.toString()}>
					<div className="fold-card col-span-1">
						<div className="card">
							<button className="dlt-btn">
									<i className="fa-solid fa-xmark"></i>
							</button>
							<div className="card-bg fold-bg"></div>
							<div className="col-content fold-content">
									<h5>{folder.directory_name}</h5>
							</div>
						</div>
					</div>
				</Link>
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
			{ownFoldID.map((file) => (

				<Link key={file.page_id} to={file.page_id.toString()}>
					<div className="fold-card  col-span-1">
						<div className="card">
							<button className="dlt-btn">
									<i className="fa-solid fa-xmark"></i>
							</button>
							<div className="card-bg file-bg"></div>
							<div className="col-content fold-content">
									<h5>{file.page_name}</h5>
							</div>
						</div>
					</div>
				</Link>
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
		Burası sayfa: {foldID}

		<AddColFoldFile />
	</>
  )
}
