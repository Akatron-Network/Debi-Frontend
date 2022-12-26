import React , {useContext , useEffect} from 'react'
import { ChartContext } from '../../context';
import ConditionsAndSort from '../ConditionsAndSort';

export default function TreeMap() {
  const chart_data = useContext(ChartContext);
  console.log(chart_data)

  useEffect(() => {
    return () => {
      chart_data.setAllAxis([]);
    }
  }, [])

  return (
    <>
        
      <div className='flex mt-3'>
        <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
          Kolonlar
        </h1>

        <hr className="mb-3 mt-4 border-1 w-full ml-3 border-hr_gray" />
      </div>

      <div className='grid grid-cols-4 mt-2'>

        <div className="form-control mb-2 col-span-2 mr-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              1. Kolon
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[65%] !rounded-l-none"
              ref={chart_data.yColSelRef}
            >
              <option disabled value="default">
                Bir kolon seçin...
              </option>
              {chart_data.colList.map((tbi) => {
                let table = Object.keys(tbi)[0]
                return (tbi[table].columns.map((col , index) => {
                  
                  if (col.includes("|")) {
                    col = col.split("|")[1]
                  }
                  return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{col}</option>) // {table} - {col}
                }))
              })}
            </select>
          </div>
        </div>

        {/* <div className="form-control mb-2 w-1/2 ml-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Yatay Eksen
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[65%] !rounded-l-none"
              ref={chart_data.xColSelRef}
            >
              <option disabled value="default">
                Bir kolon seçin...
              </option>

              {chart_data.colList.map((tbi) => {
                let table = Object.keys(tbi)[0];
                return (tbi[table].columns.map((col , index) => {
                  return (<option key={index} value={tbi[table].alias + "/" + table + "/" + col}>{table} - {col}</option>)
                }))
              })}
            </select>
          </div>
        </div> */}

      {chart_data.allAxis.map((alias) => {
        // console.log(chart_data.xColSelRef.current["A"].value);

        console.log(chart_data.allAxis.indexOf(alias))
        let padding = "";
        if(chart_data.allAxis.indexOf(alias) % 2 !== 0) {
          padding = "pr-[6px]"
        } else {
          padding = "pl-[6px]"
        }

        return (
            <div key={alias} className={"form-control mb-2 col-span-2 " + padding}>
              <div className="input-group shadow-md">
                <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                {chart_data.allAxis.indexOf(alias) + 2}. Kolon
                </span>
                <select
                  defaultValue="default"
                  className="condition_select max-w-[58%] !rounded-none"
                  ref={(el) => {if (chart_data.yColSelRef.current !== null) chart_data.yColSelRef.current[alias] = el}}
                >
                  <option disabled value="default">
                    Bir kolon seçin...
                  </option>
                  {chart_data.colList.map((tbi) => {
                    let table = Object.keys(tbi)[0];
                    return (tbi[table].columns.map((col , index) => {
                      
                  if (col.includes("|")) {
                    col = col.split("|")[1]
                  }
                      return (<option key={index} value={tbi[table].alias + "/" + table + "/" + col}>{col}</option>) // {table} - {col}
                    }))
                  })}
                </select>
                <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.dltAxis(alias)}><i className="fa-solid fa-xmark"></i></button>
              </div>
            </div>
      )})}
      <div className='col-span-2 items-center flex h-10 mb-2'><button className="green-btn relative !left-1/2 !-translate-x-1/2 w-1/2" onClick={chart_data.addAxis}><i className="fa-solid fa-plus mr-1"></i>Yeni Kolon Ekle</button></div>
      </div>

      
      <ConditionsAndSort />
    </>
  )
}
