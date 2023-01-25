import React , { useContext } from 'react'
import { ShareContext } from '../context'

export default function ShareTable() {
  const share_data = useContext(ShareContext);

  return (
    <div className='bg-side_black border border-onyx h-72 overflow-auto'>
      <table className="w-full text-sm text-left text-grayXgray ">
        <thead className="text-xs text-cultured uppercase bg-black_light border-b border-jet_mid">
          <tr>
            <th className="px-2 py-3">Kullanıcı Adı</th>
            <th className="px-2 py-3 w-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-jet border-b border-jet_mid transition duration-200 hover:bg-jet_light hover:text-platinium">
            <th className="px-2 py-1 truncate">ExCaLiBuR_63_NecMI</th>
            <th className="px-2 py-1 truncate text-right">
              <button className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button>
              <button className='hover:text-danger_light transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
