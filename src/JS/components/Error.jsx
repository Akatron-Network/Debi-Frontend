import React, { useContext } from 'react'
import { MainContext } from './context';

export default function Error() {
  const { errorText } = useContext(MainContext);

  return (
    <>
      <input type="checkbox" id="errorScreen" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box bg-middle_black rounded w-[40%] p-0">

          <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-jet_shadow rounded-t">
            <div className="flex text-2xl items-center mb-3">
              <i className="fa-solid fa-circle-exclamation text-danger_light"></i>
              <h1 className='text-platinium ml-3'>Hata</h1>
            </div>

            <label type="button" htmlFor="errorScreen" className="text-oxford_blue mt-[2px] bg-transparent cursor-pointer text-base hover:bg-jet_shadow hover:text-platinium transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></label>
          </div>
            
          <div className="p-5 pt-3 flex flex-col">
            <span className='text-lg font-bold text-danger_light'>{errorText.code}</span>
            <span className='text-base font-bold text-grayXgray'>{errorText.message}</span>
            <hr className="h-px w-2/3 relative left-0 bg-darker_jet border-0 my-2"></hr>
            <span className='text-base text-graysix'>{errorText.response}</span>
          </div>

        </div>
      </div>
    </>
  )
}
