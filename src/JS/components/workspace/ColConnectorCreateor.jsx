import React , { useContext , useEffect } from 'react'
import { MainContext } from '../context'
import WorkspaceAll from '../../libraries/categories/Workspace';
import Data from '../../libraries/categories/Data';
import Input from '../Input'

export default function ColConnectorCreateor() {
	const data = useContext(MainContext);

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
    for(let db in data.dbSchemas) {
      data.checkDBSchemaRef.current[db].checked = false;
    }
    data.checkDBSchemaRef.current[index].checked = true;
    data.setChoosenSchema(data.dbSchemas[index])
  }

  const testConnection = async () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.colWorksNickRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" && data.colServerRef.current.value !== "" && data.colPortRef.current.value !== "") {
      
      var connectionContent = createContent();

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
      // checkWarn(2)

    } else {checkWarn(1)}
  }
 
  const addWorksApply = async () => {
    if(data.colWorksSelectRef.current.value !== "default" && data.colNameRef.current.value !== "" && data.colWorksNickRef.current.value !== "" && data.colWorksPassRef.current.value !== "" && data.colWorksDBRef.current.value !== "" && data.colServerRef.current.value !== "" && data.colPortRef.current.value !== "") {
      var connectResp = await data.funcLoad(testConnection);
      var connectionContent = createContent();

      if(connectResp.Success === true) {
        if (Object.keys(data.editCollectionDetails).length > 0) {
          var forColID = await WorkspaceAll.putCollections(data.editCollectionDetails.collection_id, {collection_name: data.colNameRef.current.value, db_scheme_id: data.choosenSchema});
        }
        else {
          var forColID = await WorkspaceAll.postCollections(data.colNameRef.current.value, data.choosenSchema);
        }

        if (data.checkedConnector === false) {
          const a = await Data.postConnector(forColID.Data.collection_id, data.colWorksSelectRef.current.value, false, undefined,  connectionContent);
        } 
        else {
          const a = await Data.postConnector(forColID.Data.collection_id, data.colWorksSelectRef.current.value, true, data.colConnectorServerRef.current.value,  connectionContent);
          const sync = WorkspaceAll.getRefresh(data.colConnectorServerRef.current.value)
        }

        if(data.checkedTrialPack) {
          const add = await WorkspaceAll.addTrialPack(forColID.Data.collection_id);

          data.funcLoad(data.getFavorites);
        }

        data.getTreeCollections();

        await data.getColWorks();
        document.getElementById('addWorksCol').checked = false;
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
          <div className="form-control mb-2">
            <div className="input-group shadow-md">
              <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Şifre</span>
              <input type="password" placeholder={"Şifre girin"} className="input my-0 input-bordered !rounded-l-none w-full h-auto" ref={data.colWorksPassRef} />
            </div>
          </div>
          <Input value={"Veritabanı Adı"} refName={data.colWorksDBRef}/>
          <div className='inline-flex w-full items-center p-1 mb-2'>
            <input type="checkbox" id='checkedExpress' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checkedExpress} onChange={() => data.setCheckedExpress(!data.checkedExpress)} />
            <span className='text-[14px] text-grayXgray'>SQLEXPRESS</span>
          </div>
          <Input value={"Sunucu Adresi"} refName={data.colServerRef}/>
          <Input value={"Port"} refName={data.colPortRef}/>

          <div className='inline-flex w-full items-center p-1'>
            <input type="checkbox" id='checkedConnector' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checkedConnector} onChange={() => data.setCheckedConnector(!data.checkedConnector)} />
            <span className='text-[14px] text-grayXgray'>Yerel sunucu kullanmak istiyorum.</span>
          </div>

          <div className={data.checkedConnector ? "hidden" : "hidden" }>            
            <div className="form-control mb-2">
              <div className="input-group shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Geçit Adresi</span>
                <input type="text" placeholder="Geçit Adresi girin" className="input my-0 input-bordered !rounded-l-none w-full h-auto" ref={data.colConnectorServerRef} value="127.0.0.1" onChange={() => {}} />
              </div>
            </div>
          </div>

          <div className='inline-flex w-full items-center p-1'>
            <input type="checkbox" id='checkedTrialPack' className="checkbox mr-2 transition duration-300 hover:border-onyx_middle h-4 w-4" checked={data.checkedTrialPack} onChange={() => data.setCheckedTrialPack(!data.checkedTrialPack)} />
            <span className='text-[14px] text-grayXgray'><i className="fa-solid fa-box-open mr-2"></i>Hazır koleksiyon paketi istiyorum.</span>
          </div>

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
            <button onClick={() => data.funcLoad(addWorksApply)} className='green-btn float-right mt-1'>Kaydet</button> 
            :
            <button onClick={() => data.funcLoad(addWorksApply)} disabled className='green-btn float-right mt-1'>Kaydet</button>
          }
          <button onClick={() => data.funcLoad(testConnection)} className='gray-btn float-right mr-1 mt-1'>Bağlantı Kontrol</button>
        </label>
      </label>
    </div>
  )
}
