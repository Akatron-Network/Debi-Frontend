import React , {useContext , useEffect} from 'react'
import { ChartContext } from '../../context';
import ConditionsAndSort from '../ConditionsAndSort';

export default function TreeMap() {
  const chart_data = useContext(ChartContext);

  useEffect(() => {
    return () => {
      chart_data.setAllAxis([]);
    }
  }, [])

  return (
    <>
      <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
        Kolonlar
      </h1>

      <div className='flex mt-2'>

        <div className="form-control mb-2 w-1/2 mr-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Dikey Eksen
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
                  return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{table} - {col}</option>)
                }))
              })}
            </select>
          </div>
        </div>

        <div className="form-control mb-2 w-1/2 ml-[6px]">
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
        </div>
      </div>

      {chart_data.allAxis.map((alias) => {
        // console.log(chart_data.xColSelRef.current["A"].value);

        return (
          <div key={alias} className='w-full'>
            <div className="form-control mb-2 w-1/2 pr-[6px]">
              <div className="input-group shadow-md">
                <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                  Dikey Eksen
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
                      return (<option key={index} value={tbi[table].alias + "/" + table + "/" + col}>{table} - {col}</option>)
                    }))
                  })}
                </select>
                <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.dltAxis(alias)}><i className="fa-solid fa-xmark"></i></button>
              </div>
            </div>
          </div>
      )})}

      <div className='w-full'><button className="green-btn !ml-[25%] !-translate-x-1/2" onClick={chart_data.addAxis}><i className="fa-solid fa-plus mr-1"></i>Dikey Eksen Ekle</button></div>

      <ConditionsAndSort />
    </>
  )
}
