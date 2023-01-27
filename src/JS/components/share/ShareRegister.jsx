import React , { useContext } from 'react'
import { ShareContext } from '../context'
import Input from '../Input'

export default function ShareRegister() {
  const share_data = useContext(ShareContext);
  return (
    <>
      <Input value={"Kullanıcı Adı"} refName={share_data.shareUsernameRef} />

      <div className='inline-flex w-full items-center p-1'>
        <input type="checkbox" ref={share_data.shareAuthRef} className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4"/>
        <span className='text-[14px] text-grayXgray'>Düzenleme <span className='text-xs text-onyx_light'>(Bu şık işaretlenmezse sadece <span className='text-graysix font-bold'>görüntüleme</span> yetkisine sahip olacaktır.)</span></span>
      </div>

      <div className='text-right w-full'><button className="green-btn" onClick={() => share_data.postShare()}>Paylaş</button></div>
    </>
  )
}
