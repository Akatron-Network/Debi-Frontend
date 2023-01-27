import React , { useState , useContext , useEffect } from 'react'
import { ShareContext } from '../context'

export default function ShareTable() {
  const share_data = useContext(ShareContext);

  useEffect(() => {
    getTable();
  }, [share_data.shareItemInfo])

  const [table, setTable] = useState([])

  const getTable = () => { //. Check type, get jsx and set result in setTable
    
    let dt = share_data.shareItemInfo;
    let resp = [];

    if (dt.shared_item_type === "COLLECTION") {
            
      share_data.iShareItems.shared_collections.map((col, index) => {

        if (dt.shared_item_id === col.collection.collection_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{col.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                <button className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })

    }
    else if (dt.shared_item_type === "DIRECTORY") {
            
      share_data.iShareItems.shared_directories.map((dir, index) => {

        if (dt.shared_item_id === dir.directory.directory_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{dir.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                <button className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })
      
    }
    else if (dt.shared_item_type === "PAGE") {
            
      share_data.iShareItems.shared_pages.map((page, index) => {

        if (dt.shared_item_id === page.page.page_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{page.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                <button className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })      
      
    }

    setTable(resp);
  }
  

  return (
    <div className='bg-jet border border-onyx h-56 overflow-auto'>
      <table className="w-full text-sm text-left text-grayXgray ">
        <thead className="text-xs text-cultured uppercase bg-black_light border-b border-jet_mid">
          <tr>
            <th className="px-2 py-3">Kullanıcı Adı</th>
            <th className="px-2 py-3 w-7"></th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  )
}
