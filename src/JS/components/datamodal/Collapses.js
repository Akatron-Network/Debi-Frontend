import React , { useContext , useState , useEffect } from 'react'
import { DataModalContext } from '../context'
import Condition from './Condition';

export default function Collapses(props) {
  const data = useContext(DataModalContext);
  console.log(data)

  const [mainDlt, setMainDlt] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [conds, setConds] = useState([])

  useEffect(() => {
    if (props.main === "main") {
      setMainDlt(true);
    }
    setConds(getconds())
  }, [data.dataJSON]);
  
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
    console.log(ret)
    return ret
  }

  return (
    <div
      id={"collapse_" + props.main}
      className={"collapse collapse-plus collapse_extra " + (checkbox ? "bg-jet" : null)}
      onClick={() => setCheckbox(!checkbox)}
    >
      <input type="checkbox" className="!min-h-0 !py-2 !px-4" />
      <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
        {props.data.source_table.name}
        <span className="text-onyx_light">
          {" (" + props.data.source_table.table + ")"}
        </span>
      </div>

      <div className="collapse-content text-graysix">
        <div className="table_layout max-h-72">
          {props.data.source_table.columns.map((col, index) => (
            <div
              key={index}
              id={"elm_" + props.main + "_" + index}
              className="table_col_cards"
              onClick={() => data.addColumns(props.main, col.name, index)}
            >
              <h4 className="text-sm text-sea_green truncate">{col.name}</h4>
              <span className="text-xs text-grayXgray truncate">
                {col.details}
              </span>
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
