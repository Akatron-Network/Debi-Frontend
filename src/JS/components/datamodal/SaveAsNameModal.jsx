import React , { useContext } from 'react'
import { DataModalContext, MainContext } from '../context'

export default function SaveAsNameModal() {
  const data = useContext(DataModalContext);
  const { funcLoad } = useContext(MainContext);

  return (
    <>
    <input type="checkbox" id="saveAsNameModal" className="modal-toggle" />
    <label htmlFor="saveAsNameModal" className="modal bg-modal_back">
      <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="" >
      <h2 className="text-lg mb-3 text-platinium">Model Adı<span className='text-base text-onyx_light'>&nbsp; (Farklı Kaydet)</span></h2>
        <h3 className="text-base">Lütfen <span className='font-bold text-sea_green'>yeni model</span> adı girin.</h3>
          <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.saveAsNameRef} />
          <span id='saveAsWarn' className='text-sm text-red-600 hidden'>Lütfen farklı bir model adı girin!</span>
          <button onClick={() => funcLoad(data.saveAsDataJSON)} className='green-btn float-right mt-3'>Kaydet</button>
      </label>
    </label>
    </>
)
}
