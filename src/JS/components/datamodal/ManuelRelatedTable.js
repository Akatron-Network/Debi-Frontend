import React , {useState, useContext, useEffect } from 'react'
import { DataModalContext } from '../context'
import ModalSourceTable from './ModalSourceTable';

export default function ManuelRelatedTable() {
  const data = useContext(DataModalContext);
  console.log(data);

  const [srcRel, setSrcRel] = useState([]);
  const [rfrRel, setRfrRel] = useState([]);

  useEffect(() => {
    if (data.tables.O === undefined) { return; }
    getSourceOptions();
    getReferenceOptions();

    return () => {
      setRfrRel([]);
      setSrcRel([]);
    }

  }, [data.modalRelations])

  const getSourceOptions = () => {
    if (Object.keys(data.modalTables).length === 0) {
      return;
    }

    let rels = [];

    for (let r of data.tables.O.source_table.columns) {
      if (!rels.includes(r.name)) {
        rels.push(r.name);
      }
    }
    setSrcRel(rels);
  }

  const getReferenceOptions = () => {
    if (Object.keys(data.modalTables).length === 0) {
      return;
    }

    let rels = [];
    for (let r of data.modalTables.O.source_table.columns) {
      if (!rels.includes(r.name)) {
        rels.push(r.name);
      }
    }
    setRfrRel(rels);
  }

  return (
    <>
      <input type="checkbox" id="manuelrelatedmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box p-4 bg-middle_black rounded w-[40%]" style={{overflow: "unset"}}>
          <h1 className="text-lg text-platinium mb-2 drop-shadow-lg ml-[2px]">Yeni İlişkili Tablo Oluştur</h1>

          <ModalSourceTable />

          <div className='grid grid-cols-11 mt-4'>
            <select defaultValue='default' ref={data.sourceColsRef} className="condition_select col-span-5" >
              <option value="default">Seçilen tablo kolonu seçin...</option>
              {rfrRel.map((rel , index) => {
                return(<option key={index} value={rel}>{rel}</option>)
              })}
            </select>

            <span className='text-grayXgray col-span-1 items-center justify-center inline-flex'><i className="fa-solid fa-equals"></i></span>

            <select defaultValue='default' ref={data.referencedColsRef} className="condition_select col-span-5" >
              <option value="default">Kaynak tablo kolonu seçin...</option>
              {srcRel.map((rel , index) => {
                return(<option key={index} value={rel}>{rel}</option>)
              })}
            </select>
          </div>
          
          <div className="modal-action bottom-4 right-4">
            <label htmlFor="manuelrelatedmodal" onClick={data.clearManRelTblInp} className="gray-btn">
              Kapat
            </label>
            <button onClick={data.saveManRelTbl} className="green-btn">Kaydet</button>
          </div>
        </div>
      </div>
    </>
  )
}
