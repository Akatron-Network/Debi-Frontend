import React , { useContext , useState } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';
import Input from '../Input'

export default function ColConnectorCreateor() {
	const data = useContext(MainContext);
  console.log(data)

  const addWorksApply = async () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.colNameRef.current.value !== "" && data.colWorksNickRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" ) {
      
      await WorkspaceAll.postCollections(data.colNameRef.current.value);
      data.getColWorks();
      
      document.getElementById('addWorksCol').checked = false;
    }
    else {
      
      document.getElementById('colWarn').classList.add('!block');

    }
  }

  const checkConnector = () => {
    console.log(!data.checked)
    data.setChecked(!data.checked);
  }

  return (
    <div>
      <input type="checkbox" id="addWorksCol" className="modal-toggle" />
      <label htmlFor="addWorksCol" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">

          <Input value={"Koleksiyon adı"} refName={data.colNameRef}/>

          <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>
          <h2 className="text-xl mb-3">Bağlantı Paneli</h2>

          <div className="form-control mb-2">
            <div className="input-group shadow-md">
              <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Bağlantı Tipi</span>
              <select defaultValue='default' className="condition_select max-w-[65%] !rounded-l-none" ref={data.colWorksSelectRef}>
                <option disabled value="default">Bir bağlantı tipi seçin...</option>
                <option value="mssql">MSSQL</option>
              </select>
            </div>
          </div>

          <Input value={"Kullanıcı adı"} refName={data.colWorksNickRef}/>
          <Input value={"Şifre"} refName={data.colWorksPassRef}/>
          <Input value={"Veritabanı Adı"} refName={data.colWorksDBRef}/>
          <Input value={"Sunucu Adres"} refName={data.colServerRef}/>

          <div className='inline-flex w-full items-center p-1'>
            <input type="checkbox" className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checked} onChange={checkConnector} />
            <span className='text-[14px] text-grayXgray'>Ağ geçidi kullanmak istiyorum.</span>
          </div>

          <div className={data.checked ? "block mt-2" : "hidden" }><Input value={"Geçit Adresi"} refName={data.colConnectorServerRef}/></div>
          

          <span id='colWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
          <button onClick={() => addWorksApply()} className='green-btn float-right'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
