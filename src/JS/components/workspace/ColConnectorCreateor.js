import React , { useContext , useEffect } from 'react'
import { MainContext } from '../context'
import Input from '../Input'

export default function ColConnectorCreateor() {
	const data = useContext(MainContext);
  console.log(data)

  const apply = () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.worksNameRef.current.value !== "" && data.colWorksNameRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" ) {

    }
    else {
      // if (type === 'koleksiyon') {
      //   await WorkspaceAll.postCollections(data.worksNameRef.current.value);
      //   data.getColWorks();
      // }
      
      document.getElementById('colWarn').classList.add('!block');

    }
  }

      // data.colWorksNameRef.current.value = "";
      // data.colWorksPassRef.current.value = "";
      // data.colWorksDBRef.current.value = "";
      // data.colWorksSelectRef.current.value = "default";
  
  

  return (
    <div>
      <input type="checkbox" id="addWorks" className="modal-toggle" />
      <label htmlFor="addWorks" className="modal bg-modal_back">
        <label className="modal-box relative max-w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">

          <Input value={"Koleksiyon adı"} refName={data.colWorksNameRef}/>

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

          <Input value={"Kullanıcı adı"} refName={data.colWorksNameRef}/>
          <Input value={"Şifre"} refName={data.colWorksPassRef}/>
          <Input value={"Veritabanı Adı"} refName={data.colWorksDBRef}/>

          <span id='colWarn' className='text-sm text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
          <button onClick={() => apply()} className='green-btn float-right mt-3'>Kaydet</button>
        </label>
      </label>
    </div>
  )
}
