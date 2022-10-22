import React , {useContext} from 'react'
import { MainContext } from '../context'

export default function DeleteApply() {
	const data = useContext(MainContext);

    const deleteApplyFn = async () => {
			if(data.deleteItemType === "koleksiyon") {
				data.deleteItems( "collection" , data.deleteItemRef.collection_id)
			}
			else if(data.deleteItemType === "klasör") {
				data.deleteItems( "folder" , data.deleteItemRef.directory_id)
			}
			else if(data.deleteItemType === "sayfa") {
				data.deleteItems( "file" , data.deleteItemRef.page_id)
			}
    document.getElementById('dltWorks').checked = false;
    }

  return (
	<>
		<input type="checkbox" id="dltWorks" className="modal-toggle" />
		<label htmlFor="dltWorks" className="modal bg-modal_back">
		<label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
			<h3 className="text-lg md:mb-8">Silmek istediğinize emin misiniz?</h3>
				<label htmlFor="dltWorks" className='gray-btn float-right md:ml-[6px]'>Hayır</label>
				<button className='green-btn float-right' onClick={deleteApplyFn}>Evet</button>
			</label>
		</label>
	</>
  )
}
