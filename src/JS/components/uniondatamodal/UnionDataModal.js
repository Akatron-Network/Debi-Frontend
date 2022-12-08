import React , { useContext , useState , useEffect , useRef } from 'react'
import { UnionDataModalContext , ModalContext , MainContext } from '../context'
import UnionTable from '../uniondatamodal/UnionTable';
import UnionCollapse from './UnionCollapse';
import UnionColumns from './UnionColumns';
import { getAlias } from '../../libraries/misc';
import UnionCollectionSelect from './UnionCollectionSelect';
import WorkspaceAll from '../../libraries/categories/Workspace';
import Data from '../../libraries/categories/Data';

export default function UnionDataModal() {
  const modal_data = useContext(ModalContext);
  const maincontext_data = useContext(MainContext);
  console.log(maincontext_data);
  console.log(modal_data)

  const [collections, setCollections] = useState([]);
  const [sourceColumns, setSourceColumns] = useState({});
  const [executeUnionCols, setExecuteUnionCols] = useState([]);
  const [executeUnionRows, setExecuteUnionRows] = useState([]);

  const unionNameRef = useRef("");
  const unionExplanationRef = useRef("");
  const unionCollectionNameRef = useRef("");
  const unionColumnsNameRef = useRef([]);
  const unionSourceColumnSelectRef = useRef([]);
  const unionSourceModelSelectRef = useRef([]);
  const unionSourceNameRef = useRef([]);
  const unionSourceTitleNameRef = useRef([]);

  //* unionJSON Template
  // {
  //   union_name: "Cari Birleşim",
  //   union_expl: "Test Açıklama",
  //   columns: {
  //       Cari_Kod: true,
  //       Cari_Isim: true
  //   },
  //   db_scheme_id: "NETSIS",
  //   childs: [
  //       {
  //           child_id: 20,
  //           child_type: "model",
  //           child_name: "IZMIR SUBE",
  //           columns: [
  //               "CARI_KOD",
  //               "CARI_ISIM"
  //           ]
  //       }
  //   ]
  // }
  const [unionJSON, setUnionJSON] = useState(
    {
      union_name: "",
      union_expl: "",
      columns: [],
      db_scheme_id: "",
      childs: []
    }
  )

  useEffect(() => {
    getCollections();
  }, [])
  

  //? Choose Collections, Name, Explanation -------------------------------
  const getCollections = async () => {
    let resp = await WorkspaceAll.getCollections();
    console.log(resp)
    setCollections(resp.Data.owned_collections);
  }

  const collectionSelect = (colID) => {
    for (let c of collections) {
      if (c.collection_id === parseInt(colID)) {
        setUnionJSON(
          {
            ...unionJSON,
            db_scheme_id: c.db_scheme_id
          }
        )
      }
    }
  }

  const nameExplanationSave = (type) => {
    let val = "";

    if (type === "name") {
      val = unionNameRef.current.value
      setUnionJSON(
        {
          ...unionJSON,
          union_name : val
        }
      )
    } else if (type === "exp") {
      val = unionExplanationRef.current.value
      setUnionJSON(
        {
          ...unionJSON,
          union_expl : val
        }
      )

    }
  }
  //? --------------------------------------------------
  

  //? Columns ------------------------------------------
  const addColumns = () => {
    let new_columns = [...unionJSON.columns , ""];
    let new_childs = [...unionJSON.childs];

    if (new_childs.length > 0) {  // Eğer daha önceden eklenmiş bir kaynak var ise o kaynağı burada kontrol ediyoruz.
      for (let c of new_childs) { // Kaynağın içerisine "" şeklinde bir eleman daha ekliyoruz. Yeni kolon anlamında
        c.columns.push("")
      }

      setUnionJSON(
        {
          ...unionJSON,
          childs: new_childs,
          columns: new_columns
        }
      )

    } else {
      setUnionJSON(
        {
          ...unionJSON,
          columns: new_columns
        }
      )
    }
  }

  const deleteColumns = (index) => {
    let new_columns = [...unionJSON.columns];
    let new_childs = [...unionJSON.childs];

    new_columns.splice(index , 1)
    
    for (let i in new_columns) {  // Bunun amacı kolon sildiğimizde kolonların bilgilerini düzgün şekilde yazdırmak
      unionColumnsNameRef.current[i].value = new_columns[i];
    }

    if (new_childs.length > 0) {  // Eğer daha önceden eklenmiş bir kaynak var ise o kaynağı burada kontrol ediyoruz.
      for (let c in new_childs) { // Kaynağın içerisinden indekslenen elemanı çıkarıyoruz
        new_childs[c].columns.splice(index , 1)

        for (let i in new_childs[c].columns) {  // Burada props indeks  bizim c elemanımız oluyor. i ise kolonnu selectinin indeksi oluyor. örn: 0_1 referansından alıyoruz bilgileri
          unionSourceColumnSelectRef.current[c + "_" + i].value = new_childs[c].columns[i];
        }
      }

      setUnionJSON(
        {
          ...unionJSON,
          childs: new_childs,
          columns: new_columns
        }
      )

    } else {
      setUnionJSON(
        {
          ...unionJSON,
          columns: new_columns
        }
      )
    }
  }

  const columnsNameSave = (index) => {
    let val = unionColumnsNameRef.current[index].value;
    let new_columns = [...unionJSON.columns]

    new_columns[index] = val;

    setUnionJSON(
      {
        ...unionJSON,
        columns: new_columns,
      }
    )

  }
  //? --------------------------------------------------


  //? Sources ------------------------------------------
  const addSources = () => {
    let new_sources = [...unionJSON.childs];
    let columns = [];

    for (let c = 0; unionJSON.columns.length > c ; c++) { columns.push("") } //unionJSON içerisinde columnsta kaç tane kolon var ise yeni oluşturduğumuz kaynak içerisindeki
                                                                             //kolon listesine o kadar kolon oluşturuyoruz. örnek: 3 tane kolon varsa -> ["","",""] şeklinde
    let source =  {
                    child_id: null,
                    child_type: "",
                    child_name: "",
                    columns: columns
                  };
                  
   new_sources.push(source);

    setUnionJSON(
      {
        ...unionJSON,
        childs : new_sources
      }
    )
  }

  const deleteSources = (index) => {
    let new_sources = [...unionJSON.childs]
    new_sources.splice(index, 1)

    //Bunun amacı kaynak sildiğimizde kendisinden sonra gelen bir kaynak varsa onun bilgilerini aktarmak.
    console.log(new_sources);
    for (let i in new_sources) {
      console.log(new_sources[i])
      unionSourceModelSelectRef.current[i].value = new_sources[i].child_id;
      unionSourceNameRef.current[i].value = new_sources[i].child_name;
      unionSourceTitleNameRef.current[i].innerHTML = " (" + new_sources[i].child_name + ")";
    }

    setUnionJSON(
      {
        ...unionJSON,
        childs : new_sources
      }
    )
  }
  
  const renderCollapses = () => {
    let ret = [];
    let i = 0;

    for (let child of unionJSON.childs) {
      ret.push(<UnionCollapse data={child} key={i} index={i} /> )
      i++;
    }

    return ret;
  }

  const sourceModelSelect = (index) => { //+ ToDo
    let val = unionSourceModelSelectRef.current[index].value
    let new_childs = [...unionJSON.childs]

    new_childs[index].child_id = parseInt(val);
    new_childs[index].child_type = "model"; //+ Burada model olarak direkt kaydediyoruz ama ileride birleşik model de olabilir

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs,
      }
    )
    
    if (val !== undefined) renderSourceColumnsOptions(val, index);
  }

  const sourceName = (index) => {
    let val = unionSourceNameRef.current[index].value;
    let new_childs = [...unionJSON.childs]

    new_childs[index].child_name = val;

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs
      }
    )
    unionSourceTitleNameRef.current[index].innerHTML = " (" + unionSourceNameRef.current[index].value + ")"
  }

  const sourceColumnsSave = (sourceIndex, columnIndex, value) => {
    let new_childs = [...unionJSON.childs];
    new_childs[sourceIndex].columns[columnIndex] = value; //Eğer ileride O/TBLCAHAR/CARI_KOD gibi bir value gelirse value.split("/")[2] bunu kullan

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs,
      }
    )
  }

  const renderSourceColumnsOptions = (modelID, index, extraColOpts = {}) => {

    console.log(modelID);
    let columns = [];
    let columns_option = {...sourceColumns, ...extraColOpts};
    let i = 0;

    for (let m of modal_data.modalList) { // Model ID si aynı olanların içerisindeki query'den table, alias ve kolon isimlerini alıp bir liste oluşturduk.
      if (m.model_id === parseInt(modelID)) {

          // columns.push(m.query.alias + "/" + m.query.table + "/" + s) - İleride gerekirse bunu kullanabiliriz örn: O/TBLCAHAR/CARI_KOD
          var keyMain = Object.keys(m.query.select)
          var valueMain = Object.values(m.query.select)

          let arrMain = [];
          for (let v in valueMain) {
            //* Toplam vb işlemler için kolonları 3 e bölerek isimlendirdik. Valuesi true gelenler, sum-min vs gelenler bir de içerisinde {} bulunduranlar olarak.
            if (valueMain[v] === true) {
              arrMain.push(keyMain[v])
            } else if (keyMain[v].includes("{")) {
              arrMain.push(keyMain[v].replaceAll("{" , "").replaceAll("}" , ""))
            } else {
              arrMain.push(keyMain[v] + "_" + valueMain[v])
            }
          }
          columns = columns.concat(arrMain)

        if (m.query.includes.length > 0) {
          for (let q of m.query.includes) {
            let arrAlias = [];
            let valueAlias =Object.values(q.select);
            let keyAlias =Object.keys(q.select);
      
            for (let v in valueAlias) {
              if (valueAlias[v] === true) {
                arrAlias.push(keyAlias[v])
              } else if (keyAlias[v].includes("{")) {
                arrAlias.push(keyAlias[v].replaceAll("{" , "").replaceAll("}" , ""))
              } else {
                arrAlias.push(keyAlias[v] + "_" + valueAlias[v])
              }
            }
            columns = columns.concat(arrAlias)
          }
        }
        console.log(columns)
      }
    }

    columns_option[index] = []; // Burada tüm kaynakların kendi aliası yani indexi olduğu için şöyle bir şey oluşturduk
    for (let c of columns) {
      columns_option[index].push(<option key={i} value={c}>{c}</option>) // İleride eğer O/TBLCAHAR/CARI_KOD gibi bir value gelirse ayırmak için {c.split("/")[1]} - {c.split("/")[2]} kullanılabilir
      i++;
    }
    console.log(columns_option);

    setSourceColumns(columns_option);

    return columns_option // Çıkan sonucu setSourceColumns u beklememek için direkt yolladık ve 
  }
  //? --------------------------------------------------


  //? Others -------------------------------------------
  const refreshUnionTable = async () => {
    let columns = [...unionJSON.columns];
    let last_columns = {};
    let last_JSON = {
      collection_id: undefined,
      union: {...unionJSON}
    };
    let gateway = "";

    for (let c of columns) {  // unionJSON içerisindeki Columns u JSON a çeviriyoruz yani
      last_columns[c] = true; // ["Cari_Kod", "Cari_Isim"] -> {"Cari_Kod": true, "Cari_Isim": true} gibi olacak
    }

    last_JSON.collection_id = unionCollectionNameRef.current.value
    last_JSON.union.columns = last_columns;

    for (let c of collections) {
      if (c.collection_id === parseInt(unionCollectionNameRef.current.value)) gateway = c.connector.gateway_host
    }
    console.log(last_JSON);
    let resp = await Data.postExecute(last_JSON, gateway);
    console.log(resp)

    if (resp.Data.length > 0) {
      setExecuteUnionCols(Object.keys(resp.Data[0]).map((cols) => { // Kolon gözükürken Category diye gözükmesin istedik
        if (cols === "CATEGORY") {
          cols = "KATEGORI"
        }
        return(
          {name: cols}
        )
      }))
      setExecuteUnionRows(resp.Data.map((rows) => (Object.values(rows))))
    }
  }

  const saveUnion = async () => {
    let columns = [...unionJSON.columns];
    let last_columns = {};
    let last_JSON = {...unionJSON};

    for (let c of columns) {  // unionJSON içerisindeki Columns u JSON a çeviriyoruz yani
      last_columns[c] = true; // ["Cari_Kod", "Cari_Isim"] -> {"Cari_Kod": true, "Cari_Isim": true} gibi olacak
    }

    last_JSON.columns = last_columns;

    let resp = {};
    if (!modal_data.unionEditChecked) {  // Şu an düzenlemede mi yoksa değil mi diye kontrol ediyoruz
      resp = await Data.postUnion(last_JSON);
      console.log(resp)

    } else {
      let union_id = unionJSON.union_id;  // Union_ID yi çektik

      delete last_JSON.union_id           // Eğer düzenleme yapılıyorsa put isteği yollarken içerisindeki
      for (let js of last_JSON.childs) {  // bazı şeyleri silmmeiz gerekiyordu
        delete js.union_child_id
        delete js.union_id
      }

      resp = await Data.putUnion(union_id, last_JSON);
      console.log(resp)

    }

    if (resp.Success === true) {
      document.getElementById("unionmodal").checked = false;
      modal_data.getUnions();
      clearUnionInputs();
    }
  }

  const clearUnionInputs = () => {
    unionCollectionNameRef.current.value = "default";
    unionNameRef.current.value = "";
    unionExplanationRef.current.value = "";
    setExecuteUnionCols([]);
    setExecuteUnionRows([]);
    setSourceColumns({});
    unionSourceColumnSelectRef.current = [];
    
    if(modal_data.unionEditChecked === true) {
      modal_data.setUnionEditChecked(false);
      modal_data.setUnionInformations({});
    }

    setUnionJSON(
      {
        union_name: "",
        union_expl: "",
        columns: [],
        db_scheme_id: "",
        childs: []
      }
    )
  }
  //? --------------------------------------------------


  //? Edit Model ---------------------------------------
  useEffect(() => {
    //Edit check kontrolü yapılıyor burada. Edit mi yoksa yeni bir tane mi açıldı diye
    if (modal_data.unionEditChecked) { editUnionModel(); }
  }, [modal_data.unionEditChecked])

  const editUnionModel = () => {
    let js = {};

    for (let u of modal_data.unionList) {
      if (u.union_id === modal_data.unionInformations.union_id) {
        js = {...u};
      }
    }
    console.log(js);
    js.columns = Object.keys(js.columns);
    setUnionJSON(js);
  }

  useEffect(() => { //+ ToDo
    if (modal_data.unionEditChecked) { // Editchecked true iken çalıştıracak

      if (collections[0].db_scheme_id === unionJSON.db_scheme_id) {
        unionCollectionNameRef.current.value = collections[0].collection_id;
      }

      unionNameRef.current.value = unionJSON.union_name
      unionExplanationRef.current.value = unionJSON.union_expl

      for (let c in unionJSON.columns) {
        unionColumnsNameRef.current[c].value = unionJSON.columns[c]
      }

      let extraColOpts = {}
      for (let child in unionJSON.childs) {
        unionSourceTitleNameRef.current[child].innerHTML = " (" + unionJSON.childs[child].child_name + ")";
        unionSourceModelSelectRef.current[child].value = unionJSON.childs[child].child_id;
        unionSourceNameRef.current[child].value = unionJSON.childs[child].child_name;

        // render içerisine en sonda extra parametresi yolladık. Bu parametre ile setSourceColumns beklememize gerek kalmayacak.
        let ex = renderSourceColumnsOptions(unionJSON.childs[child].child_id, child, extraColOpts);
        extraColOpts = {...ex}
      }
    }
  }, [unionJSON])
  
  useEffect(() => { // sourceColumns değiştiinde buraya girecek ve gerekli kolonları dolduracak
    if (modal_data.unionEditChecked) { // Editchecked true iken çalıştıracak
      let arr = [];

      for (let child in unionJSON.childs) {
        for (let col in unionJSON.childs[child].columns) {
          if (unionSourceColumnSelectRef.current[child + "_" + col] === undefined || unionSourceColumnSelectRef.current[child + "_" + col] === null) {
            arr.push(col);
            continue;
          }
          unionSourceColumnSelectRef.current[child + "_" + col].value = unionJSON.childs[child].columns[col]
        }
  
        //+ Burada bir sıkıntı var o yüzden hardfix attım. Sıkıntı da şu editlerken kolon ekliyorum ama kaydetmiyorum ve sonrasında kapatıp tekrar editlemek için açtığımda eski kolonlar yerinde kalıyor gitmiyordu. Ben de hepsini sil diyorum
        unionJSON.childs[child].columns.splice(arr[0], (unionJSON.childs[child].columns.length - parseInt(arr[0])))
      }
    }
  }, [sourceColumns])
  
  //? --------------------------------------------------

  const union_data = {
    collections,
    executeUnionCols,
    executeUnionRows,
    sourceColumns,
    unionJSON,

    unionCollectionNameRef,
    unionColumnsNameRef,
    unionSourceColumnSelectRef,
    unionSourceModelSelectRef,
    unionSourceNameRef,
    unionSourceTitleNameRef,

    addColumns,
    collectionSelect,
    columnsNameSave,
    deleteColumns,
    deleteSources,
    getCollections,
    renderSourceColumnsOptions,
    sourceColumnsSave,
    sourceModelSelect,
    sourceName,
  }

  return (
    
    <UnionDataModalContext.Provider value={union_data}>
      <input type="checkbox" id="unionmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Birleşik Model Oluştur
            </h1>

            <UnionCollectionSelect />

            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />
            
            <div className="form-control mb-2">
              <div className="input-group shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>B. Model Adı</span>
                <input type="text" placeholder="B. Model Adı girin" className="input my-0 input-bordered !rounded-r w-full h-auto" ref={unionNameRef} onBlur={() => nameExplanationSave("name")} />
              </div>
            </div>
            <div className="form-control mb-2">
              <div className="input-group shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>B. Model Açıklaması</span>
                <input type="text" placeholder="B. Model Açıklaması girin" className="input my-0 input-bordered !rounded-r w-full h-auto" ref={unionExplanationRef} onBlur={() => nameExplanationSave("exp")} />
              </div>
            </div>

            <div className="justify-between items-center flex">
              <h1 className="text-lg text-platinium mt-3 mb-2 drop-shadow">
                Kolonlar
              </h1>
              <div className="tooltip tooltip-left" data-tip="Yeni Kolon Ekle">
                <button className="green-btn" onClick={addColumns}>
                  <i className="fa-solid fa-plus"></i></button>
              </div>
            </div>

            <UnionColumns />
            
            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

            <div className="justify-between items-center flex">
              <h1 className="text-lg text-platinium mt-3 mb-2 drop-shadow">
              Kaynaklar
              </h1>
              <div className="tooltip tooltip-left" data-tip="Yeni Kaynak Ekle">
                <button className="green-btn" onClick={addSources}>
                  <i className="fa-solid fa-plus"></i></button>
              </div>
            </div>
            
            {renderCollapses().map(el => {
              return (el)
            })}
            
          </div>

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative min-h-[570px] h-full">
            <h1 className="text-xl text-platinium mb-2 drop-shadow-lg pl-2 inline-flex">
              Ön İzleme
            </h1>
            <button className="green-btn float-right" onClick={refreshUnionTable}>
              <i className="fa-solid fa-rotate"></i>
            </button>
            <div id="unionReview" className="w-full bg-darker_jet rounded shadow-md border border-jet_mid p-2">
              <div id="unionTableReview" className="w-full border border-onyx rounded shadow-md overflow-auto">
                <UnionTable pagination={true} />
              </div>
            </div>

            <div id="closeUnionModalBtn" className="bottom-3 right-3 absolute">
              <label htmlFor="unionmodal" onClick={clearUnionInputs} className="gray-btn mr-2">
                Kapat
              </label>
              <button onClick={saveUnion} className="green-btn">Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </UnionDataModalContext.Provider>
  )
}
