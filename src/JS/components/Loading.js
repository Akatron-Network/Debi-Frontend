import React from 'react'

export default function Loading() {
  return (
    <>

      <label htmlFor="loadingScreen" className="btn">open modal</label>
      <input type="checkbox" id="loadingScreen" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="text-center">
          <div className='font-righteous text-[32px] mb-3'>Yükleniyor</div>
            
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          <div className="modal-action">
            <label htmlFor="loadingScreen" className="btn">Yay!</label>
          </div>
        </div>
      </div>
    </>
  )
}
