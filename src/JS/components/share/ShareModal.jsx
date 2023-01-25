import React , { useContext } from 'react'
import { ShareContext } from '../context'
import ShareRegister from './ShareRegister';
import ShareTable from './ShareTable';

export default function ShareModal() {
  const share_data = useContext(ShareContext);
	console.log(share_data)

  return (
    <>
      <input type="checkbox" id="sharemodal"  className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-[45%] h-fit p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          
          <div className='col-span-3'>
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Paylaş
            </h1>
            
            <ShareRegister />

          </div>

          <div className='col-span-2'>
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Paylaşılan Kullanıcılar
            </h1>

            <ShareTable />

            <div className='w-full text-right mt-2'>
              <label htmlFor="sharemodal" className="gray-btn">Kapat</label>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}