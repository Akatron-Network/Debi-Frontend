import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function RenameColumns() {
  var data = useContext(DataModalContext);

  return (
    <>
      <input type="checkbox" id="renameColumns" className="modal-toggle" />
      <label htmlFor="renameColumns" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="renameColumns">
        <h2 className="text-xl mb-3 text-platinium">Kolon Adı Değiştir</h2>
          <h3 className="text-lg">Lütfen yeni <span className='font-bold text-sea_green'>kolon</span> adı girin.</h3>
            <input className='input placeholder:opacity-50 w-full' type="text" placeholder="Buraya girin..." ref={data.renamedInputRef} /> {/* ref={(el) => {if (data.renameState !== "") data.renamedInputRef.current[data.renameState] = el}} */}
            <span id='renameColumnWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
            <button className='green-btn float-right mt-3' onClick={() => data.renameColumns()}>Kaydet</button>
        </label>
      </label>
    </>
  )
}
