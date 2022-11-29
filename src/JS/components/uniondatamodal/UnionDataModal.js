import React , { useContext , useState , useEffect , useRef } from 'react'
import { UnionDataModalContext , ModalContext } from '../context'
import Table from '../datamodal/Table';
import Input from '../Input';
import UnionCollapse from './UnionCollapse';
import UnionColumns from './UnionColumns';
import { getAlias } from '../../libraries/misc';

export default function UnionDataModal() {
  const modal_data = useContext(ModalContext);
  console.log(modal_data)

  const unionNameRef = useRef("");
  const unionExplanationRef = useRef("");
  const unionColumnsNameRef = useRef([]);
  const unionSourceSelectRef = useRef([]);
  const unionSourceNameRef = useRef("");
  const unionSourceColSelectRef = useRef("default");

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
      childs: [
        {
          child_id: null,
          child_type: "",
          child_name: "",
          columns: []
        }
      ]
    }
  )

  const addColumns = () => {
    let new_columns = [...unionJSON.columns , ""]

    setUnionJSON(
      {
        ...unionJSON,
        columns: new_columns
      }
    )
  }

  const deleteColumns = (index) => {
    let new_columns = [...unionJSON.columns]
    new_columns.splice(index , 1)
    if (unionColumnsNameRef.current[index + 1]) {
      unionColumnsNameRef.current[index].value = unionColumnsNameRef.current[index + 1].value
    }

    setUnionJSON(
      {
        ...unionJSON,
        columns: new_columns
      }
    )
  }

  const unionColumnsNameSave = (index) => {
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

  const unionSourceSelectSave = (index) => {
    let val = unionSourceSelectRef.current[index].value
    let new_childs = [...unionJSON.childs]

    new_childs[index].child_id = val;

    setUnionJSON(
      {
        ...unionJSON,
        childs: new_childs,
      }
    )
  }

  const addSources = () => {

  }

  const refreshUnionTable = () => {

  }

  const saveUnion = () => {

  }

  const clearUnionInputs = () => {

  }

  const openUnionModal = () => {

  }
  
  const union_data = {
    unionJSON,

    unionColumnsNameRef,
    unionSourceSelectRef,

    addColumns,
    deleteColumns,
    unionColumnsNameSave,
    unionSourceSelectSave,
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

  return (
    
    <UnionDataModalContext.Provider value={union_data}>
      <input type="checkbox" id="unionmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Birleşik Model Oluştur
            </h1>

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
