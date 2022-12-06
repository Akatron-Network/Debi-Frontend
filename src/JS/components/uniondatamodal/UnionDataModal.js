import React , { useContext , useState , useEffect , useRef } from 'react'
import { UnionDataModalContext , ModalContext , MainContext } from '../context'
import Table from '../datamodal/Table';
import Input from '../Input';
import UnionCollapse from './UnionCollapse';
import UnionColumns from './UnionColumns';
import { getAlias } from '../../libraries/misc';
import UnionCollectionSelect from './UnionCollectionSelect';
import WorkspaceAll from '../../libraries/categories/Workspace';

export default function UnionDataModal() {
  const modal_data = useContext(ModalContext);
  const maincontext_data = useContext(MainContext);
  console.log(maincontext_data);
  console.log(modal_data)

  const [collections, setCollections] = useState([])

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

  //? Choose Collections -------------------------------
  const getCollections = async () => {
    let resp = await WorkspaceAll.getCollections();
    console.log(resp)
    setCollections(resp.Data.owned_collections);
  }

  const collectionSelect = (colID) => {
    console.log(colID);
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
    // if (unionSourceNameRef.current[index + 1]) {
    //   unionSourceNameRef.current[index].value = unionSourceNameRef.current[index + 1].value
    // }
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

    new_childs[index].child_id = val;
    new_childs[index].child_type = "model"; //+ Burada model olarak direkt kaydediyoruz ama ileride birleşik model de olabilir

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs,
      }
    )
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
    console.log(sourceIndex);
    console.log(columnIndex);
    console.log(value);

    new_childs[sourceIndex].columns[columnIndex] = value;

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs,
      }
    )

  }
  //? --------------------------------------------------


  //? Others -------------------------------------------
  const refreshUnionTable = () => {

  }

  const saveUnion = () => {

  }

  const clearUnionInputs = () => {

  }

  const openUnionModal = () => {

  }
  //? --------------------------------------------------

  const union_data = {
    collections,
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

            <Input value={"B. Model Adı"} refName={unionNameRef} />
            <Input value={"B. Model Açıklaması"} refName={unionExplanationRef} />

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
              <div
                id="unionTableReview"
                className="w-full border border-onyx rounded shadow-md overflow-auto"
              >
                {/* <Table /> */}
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
