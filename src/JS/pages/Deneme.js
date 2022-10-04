import React from 'react'

export default function Deneme() {
  return (
    <div>
      <label htmlFor="my-modal-5" className="btn modal-button">open modal</label>
      
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-5 grid grid-cols-2 gap-5 bg-darkest_jet">
          
          <div className="md:col-span-1 col-span-2 bg-middle_black p-4 rounded-xl shadow-md overflow-auto">
            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          </div>

          <div className="md:col-span-1 col-span-2 bg-middle_black p-4 rounded-xl shadow-md">
            <p className="">You've been selected for a chance to get one year of subscription to use Wikipedia for free!aaaaaaaaaaaaa aaaaaa</p>
            <div className="modal-action">
              <label htmlFor="my-modal-5" className="btn">Yay!</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
