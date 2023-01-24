import React , { useRef } from 'react'
import { ShareModalContext } from '../context'
import Input from '../Input'

export default function ShareModal() {
  const shareUsernameRef = useRef("");

  const share_data = {

  }

  return (
    <>
      <ShareModalContext.Provider value={share_data}>
        <input type="checkbox" id="sharemodal"  className="modal-toggle" />
        <div className="modal bg-modal_back">
          <div className="modal-box max-w-[45%] h-fit p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
            
            <div className='col-span-3'>
              <h1 className="text-lg text-platinium mb-2 drop-shadow">
                Paylaşım
              </h1>

              <Input value={"Kullanıcı Adı"} refName={shareUsernameRef} />
              <div className='inline-flex w-full items-center p-1'>
                <input type="checkbox" id='checkedExpress' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4"/>
                <span className='text-[14px] text-grayXgray'>Düzenleme yetkisi de olsun. <span className='text-xs text-onyx_light'>(Bu şık işaretlenmezse sadece <span className='text-graysix font-bold'>görüntüleme</span> yetkisine sahip olacaktır.)</span></span>
              </div>
              <div className='text-right w-full'><button className="green-btn">Paylaş</button></div>
            </div>

            <div className='col-span-2'>
              <h1 className="text-lg text-platinium mb-2 drop-shadow">
                Paylaşılan Kullanıcılar
              </h1>

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
                        <button className='hover:text-danger_light transition duration-300 px-1'><i class="fa-solid fa-xmark"></i></button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='w-full text-right mt-2'>
                <label htmlFor="sharemodal" className="gray-btn">Kapat</label>
              </div>
            </div>
            
          </div>
        </div>
      </ShareModalContext.Provider>
    </>
  )
}
