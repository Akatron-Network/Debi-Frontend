import React , { useContext , useEffect } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';
import Data from '../../libraries/categories/Data';
import Input from '../Input'

export default function ColConnectorCreateor() {
	const data = useContext(MainContext);
  console.log(data);

  const checkWarn = (block) => {
    let warns = ["1" , "2" , "3"]

    for (let w of warns) {
      document.getElementById('colWarn' + w).classList.remove('!block');
    }

    document.getElementById('colWarn' + block).classList.add('!block');
  }

  const createContent = () => {
    var content = {
      user: data.colWorksNickRef.current.value,
      password: data.colWorksPassRef.current.value,
      database: data.colWorksDBRef.current.value,
      server: data.colServerRef.current.value,
      port: parseInt(data.colPortRef.current.value),
      options: {
          "encrypt": false,
          "trustServerCertificate": data.checkedConnector === true ? true : false,
          "instancename": data.checkedExpress === true ? "SQLEXPRESS" : undefined,
      }
    }
    return content;
  }

  useEffect(() => {                               // Component hatası verdiği için eğer dbSchemas sayısı değişirse ve
    if (data.dbSchemas.length > 0) {              // 0 dan büyükse seçili şemayı ilk olan yapacağız
      data.setChoosenSchema(data.dbSchemas[0]);   // Zaten sonrasında istenildiğinde değiştirilecek
    }
  }, [data.dbSchemas])
  

  const checkDBSchema = (index) =>{
    console.log(index)
    console.log(data.dbSchemas)
    for(let db in data.dbSchemas) {
      data.checkDBSchemaRef.current[db].checked = false;
    }
    data.checkDBSchemaRef.current[index].checked = true;
    data.setChoosenSchema(data.dbSchemas[index])
    console.log(data.dbSchemas[index]);
  }

  const testConnection = async () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.colWorksNickRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" && data.colServerRef.current.value !== "" && data.colPortRef.current.value !== "") {
      
      var connectionContent = createContent();

      try {
        if(data.checkedConnector !== true) {
          var connectResp = await Data.putConnector(data.colWorksSelectRef.current.value , connectionContent);
        }
        else {
          var connectResp = await Data.putConnector(data.colWorksSelectRef.current.value , connectionContent , data.colConnectorServerRef.current.value);
        }
        
        checkWarn(3);
        data.setDbSchemas(Object.keys(connectResp.Data.scheme_similarity))
        data.setCheckedConnection(true);
        return connectResp;

      } catch (error) {
        console.log(error);
        checkWarn(2)
      }


    } else {checkWarn(1)}

  }
 
  const addWorksApply = async () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.colNameRef.current.value !== "" && data.colWorksNickRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" && data.colServerRef.current.value !== "" && data.colPortRef.current.value !== "") {
      var connectResp = await testConnection();
      console.log(connectResp);
      var connectionContent = createContent();

      if(connectResp.Success !== false) {
        const forColID = await WorkspaceAll.postCollections(data.colNameRef.current.value, data.choosenSchema);
        setTimeout(() => {
          data.getColWorks();
        }, 500);

        if (data.checkConnector === true) {
          const a = await Data.postConnector(forColID.Data.collection_id, data.colWorksSelectRef.current.value, false, undefined,  connectionContent);
          console.log(a)

        } else {
          const a = await Data.postConnector(forColID.Data.collection_id, data.colWorksSelectRef.current.value, true, data.colConnectorServerRef.current.value,  connectionContent);
          console.log(a)
        }
        document.getElementById('addWorksCol').checked = false;
        data.getTreeCollections();
      }

    } else {checkWarn(1)}
  }

  // const checkConnector = () => {
  //   data.setCheckedConnector(!data.checkedConnector); //? datadaki checked burada her seferinde tam tersine dönüyor. checked ise unchecked değilse
  // }
  // const checkExpress = () => {
  //   data.setCheckedExpress(!data.checkedExpress); //? datadaki checked burada her seferinde tam tersine dönüyor. checked ise unchecked değilse
  // }


  return (
    <div>
      
      <input type="checkbox" id="addWorksCol" className="modal-toggle" />
      <label htmlFor="addWorksCol" className="modal bg-modal_back">
        <label className="modal-box relative w-[50%] lg:w-[35%] xl:w-[25%] h-fit p-3 bg-black_light rounded" htmlFor="">
        <h2 className="text-xl mb-3 text-platinium">Koleksiyon Oluştur</h2>
          <Input value={"Koleksiyon Adı"} refName={data.colNameRef}/>

          <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>
          <h2 className="text-lg mb-3 text-platinium">Bağlantı Bilgileri</h2>

          <div className="form-control mb-2">
            <div className="input-group shadow-md">
              <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Bağlantı Tipi</span>
              <select defaultValue='default' className="condition_select max-w-[65%] !rounded-l-none" ref={data.colWorksSelectRef}>
                <option disabled value="default">Bir bağlantı tipi seçin...</option>
                <option value="MSSQL">MSSQL</option>
              </select>
            </div>
          </div>

          <Input value={"Kullanıcı Adı"} refName={data.colWorksNickRef}/>
          <Input value={"Şifre"} refName={data.colWorksPassRef}/>
          <Input value={"Veritabanı Adı"} refName={data.colWorksDBRef}/>
          <div className='inline-flex w-full items-center p-1 mb-2'>
            <input type="checkbox" id='checkedExpress' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checkedExpress} onChange={() => data.setCheckedExpress(!data.checkedExpress)} />
            <span className='text-[14px] text-grayXgray'>SQLEXPRESS</span>
          </div>
          <Input value={"Sunucu Adresi"} refName={data.colServerRef}/>
          <Input value={"Port"} refName={data.colPortRef}/>

          {/* <div className='inline-flex w-full items-center p-1'>
            <input type="checkbox" id='checkedConnector' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checkedConnector} onChange={() => data.setCheckedConnector(!data.checkedConnector)} />
            <span className='text-[14px] text-grayXgray'>Ağ geçidi kullanmak istiyorum.</span>
          </div> */}

          <div className={data.checkedConnector ? "block mt-2" : "hidden" }><Input value={"Geçit Adresi"} refName={data.colConnectorServerRef}/></div>

          <span id='colWarn1' className='text-sm p-1 text-red-600 hidden'>Lütfen gerekli bilgileri doldurun!</span>
          <span id='colWarn2' className='text-sm p-1 text-red-600 hidden'>Bağlantı bilgileri yanlış. Lütfen tekrar gözden geçirin.</span>
          <span id='colWarn3' className='text-sm p-1 text-green-600 hidden'>Bağlantı başarılı. 'Kaydet' butonuna tıklayarak koleksiyon oluşturabilirsiniz.</span>

          {data.dbSchemas.length > 0 ? <h2 className="text-lg mt-2 mb-1 text-platinium">Veri Tabanı Şeması</h2> : undefined}
          
          {data.dbSchemas.map((sch , index) => {
            return(
              <div key={index} className='inline-flex w-full items-center p-1'>
                <input type="checkbox" defaultChecked={index === 0 ? true : false} ref={(el) => {data.checkDBSchemaRef.current[index] = el}} onClick={() => checkDBSchema(index)} className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" />
                <span className='text-[14px] text-grayXgray'>{sch}</span>
              </div>
            )
          })}

          {data.checkedConnection === true ?
            <button onClick={() => addWorksApply()} className='green-btn float-right mt-1'>Kaydet</button> :
            <button onClick={() => addWorksApply()} disabled className='green-btn float-right mt-1'>Kaydet</button>
          }
          <button onClick={() => testConnection()} className='gray-btn float-right mr-1 mt-1'>Bağlantı Kontrol</button>
        </label>
      </label>
    </div>
  )
}
