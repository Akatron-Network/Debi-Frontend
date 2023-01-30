import React , { useContext } from 'react'
import { ShareContext } from '../context'

export default function ShareTable() {
  const share_data = useContext(ShareContext);  

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
          {share_data.table}
        </tbody>
      </table>
    </div>
  )
}
