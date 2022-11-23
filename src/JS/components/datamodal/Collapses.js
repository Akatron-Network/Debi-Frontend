import React , { useContext , useState , useEffect } from 'react'
import { DataModalContext } from '../context'
import Condition from './Condition';

export default function Collapses(props) {
  var data = useContext(DataModalContext);
  console.log(data);

  const [mainDlt, setMainDlt] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [conds, setConds] = useState([])

  console.log(props)

  useEffect(() => {
    if (props.main === "main") {
      setMainDlt(true);
    }

    setConds(getconds())
  }, [data.dataJSON]);

  useEffect(() => {
    //* Her açılan collapse componentinde ilk başta calcModalCols içerisinde kolonları atıyor
    //* Cols ile gönderdiğimiz data içerisine alias ve name de ekledik
    let cols = [...props.data.source_table.columns]
    for (let i in cols) {
      cols[i]['table_alias'] = props.main;
      cols[i]['table_name'] = props.data.source_table.table;
    }
    data.setCalcModalCols({
      ...data.calcModalCols,
      [props.main]: props.data.source_table.columns
    })
  }, [])

  
  const getconds = () => {
    let ret = []
    if (props.main === 'main') {
      for (let i = 0; i < data.dataJSON.query.where_plain.length; i++) {
        let cond = data.dataJSON.query.where_plain[i]
        if (typeof(cond) === 'object') {
          ret.push(<Condition key={i} value={i} alias={'O'} />)
        }
      }
    }
    else {
      for (let i = 0; i < data.dataJSON.query.includes[props.main].where_plain.length; i++) {
        let cond = data.dataJSON.query.includes[props.main].where_plain[i]
        if (typeof(cond) === 'object') {
          ret.push(<Condition key={i} value={i} alias={props.main} />)
        }
      }
    }
    return ret
  }

  return (
    <div
      id={"collapse_" + props.main}
      className={"collapse collapse-plus collapse_extra " + (checkbox ? "bg-jet" : null)}
      
    >
      <input type="checkbox" className="!min-h-0 !py-2 !px-4" onClick={() => setCheckbox(!checkbox)} />
      <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
        {props.data.source_table.name}
        <span className="text-onyx_light">
        {props.main !== "main" ? " (" + props.data.source_table.table + ") (#" + props.main + ")" : " (" + props.data.source_table.table + ") (#O)"}
        </span>
      </div>

      <div className="collapse-content text-graysix">
        <div className="table_layout max-h-72">
          {props.data.source_table.columns.map((col, index) => (
            <div className="table_col_cards inline-grid relative" key={index} id={"elm_" + props.main + "_" + index}>
              <div onClick={() => data.addColumns(props.main, col.name, index)} className="w-full h-full">
                <h4 className="text-sm text-sea_green truncate">{col.name}</h4>
                <span className="text-xs text-grayXgray truncate">
                  {col.details}
                </span>
              </div>
                <select
                  id={"sel_" + props.main + "_" + index}
                  // ref={(el) => {if (data.colSelRef.current !== null) data.colSelRef.current[props.main + index] = el}}
                  defaultValue="default"
                  className="select hidden mt-1 min-h-0 w-fit h-8 max-h-10 !rounded focus:outline-none focus:border-onyx_light focus:bg-onyx bg-jet_mid text-grayXgray hover:text-platinium"
                  onChange={() => data.selColGroups(props.main, col.name, index)}
                >
                  <option value="default">
                    Direkt
                  </option>
                  <option value="SUM">
                    Toplam
                  </option>
                  <option value="AVG">
                    Ortalama
                  </option>
                  <option value="MAX">
                    Maksimum
                  </option>
                  <option value="MIN">
                    Minimum
                  </option>
                </select>
            </div>
          ))}
        </div>

        <div className="table_layout mt-6 max-h-[465px]">
          {conds}
          
          <div className="col-span-12 text-center">
            <button className="green-btn" onClick={() => data.addCondition(props.main)}>
              <i className="fa-solid fa-plus mr-2"></i>Koşul Ekle
            </button>
          </div>
        </div>

        {mainDlt ? null : (
          <div className="text-right">
            <button
              className="green-btn bg-danger hover:bg-danger_light"
              onClick={() => data.dltRelatedTable(props.main , props.keyID)}
            >
              <i className="fa-solid fa-xmark mr-2"></i>Tabloyu Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
