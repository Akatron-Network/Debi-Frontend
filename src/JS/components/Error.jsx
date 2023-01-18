import React from 'react'

export default function Error(props) {
  console.log(props)
  return (
    <>
      <div>Error</div>
      <div>{props.err}</div>
      
      
      <input type="checkbox" id="errorScreen" className="modal-toggle" />
      <label htmlFor="errorScreen" className="modal bg-modal_back">
        <label className="modal-box relative w-[50%] lg:w-[35%] xl:w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
        <h2 className="text-xl mb-3 text-platinium">Koleksiyon Oluştur</h2>
        </label>
      </label>
    </>
  )
}
