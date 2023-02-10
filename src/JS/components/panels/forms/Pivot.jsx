import React , {useContext , useEffect} from 'react'
import { ChartContext } from '../../context';
import ConditionsAndSort from '../ConditionsAndSort';

export default function Pivot() {
  const chart_data = useContext(ChartContext);

  useEffect(() => {
    return () => {
      chart_data.setTitleAxis([]);
      chart_data.setValueAxis([]);
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

      <div className='grid grid-cols-2 mt-2'>

        <div className='col-span-1 mr-[6px]'>
          <div className="form-control mb-2 w-full">
            <div className="input-group shadow-md">
              <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid border-r-0 justify-center min-w-[26%] xl:truncate">
                1. Sütun
              </span>
              
              <div onClick={() => chart_data.dataColumnSelect("O")} ref={chart_data.dataColumnRef} className="tooltip tooltip-top bg-black_light text-grayXgray cursor-pointer px-1 py-[7px] border border-jet_mid justify-center min-w-[9%] hover:bg-middle_black hover:text-platinium transition duration-200" data-tip="Veri Kolonu">
                <button><i className="fa-solid fa-square-root-variable"></i></button>
              </div>
              <select
                defaultValue="default"
                className="condition_select max-w-[40%] !rounded-l-none"
                ref={chart_data.xColSelRef}
                // onChange={() => chart_data.axisSel(chart_data.xColSelRef.current.value)}
              >
                <option disabled value="default">
                  Bir kolon seçin...
                </option>
                {chart_data.getColList(chart_data.colList).map((cobj, index) => {
                  return (<option key={index} value={cobj.alias + "/" + cobj.table_name + "/" + cobj.column}>{cobj.column}</option>)
                })}
              </select>
              <select
                defaultValue="default"
                className="condition_select max-w-[25%] rounded"
                ref={chart_data.xColSelGroupRef}
                // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
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
          </div>

          {chart_data.titleAxis.map((alias) => {
            // console.log(chart_data.xColSelRef.current["A"].value);
            return (
              <div key={alias} className='col-span-1'>
                <div className="form-control mb-2 w-full">
                  <div className="input-group shadow-md">
                    <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid border-r-0 justify-center min-w-[26%] xl:truncate">
                    {chart_data.titleAxis.indexOf(alias) + 2}. Sütun
                    </span>
                    <div onClick={() => chart_data.dataColumnSelect(alias)} ref={(el) => {if (chart_data.dataColumnRef.current !== null) chart_data.dataColumnRef.current[alias] = el}} className="tooltip tooltip-top bg-black_light text-grayXgray cursor-pointer px-1 py-[7px] border border-jet_mid justify-center min-w-[9%] hover:bg-middle_black hover:text-platinium transition duration-200" data-tip="Veri Kolonu">
                      <button><i className="fa-solid fa-square-root-variable"></i></button>
                    </div>
                    <select
                      defaultValue="default"
                      className="condition_select max-w-[33%] !rounded-l-none"
                      ref={(el) => {if (chart_data.xColSelRef.current !== null) chart_data.xColSelRef.current[alias] = el}}
                    >
                      <option disabled value="default">
                        Bir kolon seçin...
                      </option>
                      {chart_data.getColList(chart_data.colList).map((cobj, index) => {
                        return (<option key={index} value={cobj.alias + "/" + cobj.table_name + "/" + cobj.column}>{cobj.column}</option>)
                      })}
                    </select>
                    <select
                      defaultValue="default"
                      className="condition_select max-w-[25%] rounded !rounded-r-none"
                      ref={(el) => {if (chart_data.xColSelGroupRef.current !== null) chart_data.xColSelGroupRef.current[alias] = el}}
                      // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
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
                    <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.dltAxis(alias , "title")}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                </div>
              </div>
          )})}

          <div className='w-full'><button className="green-btn relative left-1/2 !-translate-x-1/2 w-1/2 mt-1" onClick={() => chart_data.addAxis("title")}><i className="fa-solid fa-plus mr-1"></i>Yeni Sütun Ekle</button></div>
        </div>

        <div className='col-span-1 ml-[6px]'>
            <div className="form-control mb-2">
              <div className="input-group shadow-md">
                <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                  1. Satır
                </span>
                <select
                  defaultValue="default"
                  className="condition_select max-w-[40%] !rounded-l-none"
                  ref={chart_data.yColSelRef}
                >
                  <option disabled value="default">
                    Bir kolon seçin...
                  </option>
                  {chart_data.getColList(chart_data.colList).map((cobj, index) => {
                    return (<option key={index} value={cobj.alias + "/" + cobj.table_name + "/" + cobj.column}>{cobj.column}</option>)
                  })}
                </select>
                <select
                  defaultValue="default"
                  className="condition_select max-w-[25%] rounded"
                  ref={chart_data.yColSelGroupRef}
                  // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
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
                {/* <select
                  defaultValue="default"
                  className="condition_select max-w-[20%] !rounded-l-none"
                  ref={chart_data.yColSelRef}
                >
                  <option disabled value="default">
                    Toplam
                  </option>
                  {chart_data.colList.map((tbi) => {
                    let table = Object.keys(tbi)[0]
                    return (tbi[table].columns.map((col , index) => {
                      return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{table} - {col}</option>)
                    }))
                  })}
                </select> */}
              </div>
            </div>


            {chart_data.valueAxis.map((alias) => {
              // console.log(chart_data.xColSelRef.current["A"].value);
              return (
                <div key={alias} className='col-span-1'>
                  <div className="form-control mb-2">
                    <div className="input-group shadow-md">
                      <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                      {chart_data.valueAxis.indexOf(alias) + 2}. Satır
                      </span>
                      <select
                        defaultValue="default"
                        className="condition_select max-w-[33%] !rounded-l-none"
                        ref={(el) => {if (chart_data.yColSelRef.current !== null) chart_data.yColSelRef.current[alias] = el}}
                      >
                        <option disabled value="default">
                          Bir kolon seçin...
                        </option>
                        {chart_data.getColList(chart_data.colList).map((cobj, index) => {
                          return (<option key={index} value={cobj.alias + "/" + cobj.table_name + "/" + cobj.column}>{cobj.column}</option>)
                        })}
                      </select>
                      <select
                        defaultValue="default"
                        className="condition_select max-w-[25%] rounded !rounded-r-none"
                        ref={(el) => {if (chart_data.yColSelGroupRef.current !== null) chart_data.yColSelGroupRef.current[alias] = el}}
                        // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
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
                      {/* <select
                        defaultValue="default"
                        className="condition_select max-w-[17%] !rounded-l-none"
                        ref={chart_data.yColSelRef}
                      >
                        <option disabled value="default">
                          Toplam
                        </option>
                        {chart_data.colList.map((tbi) => {
                          let table = Object.keys(tbi)[0]
                          return (tbi[table].columns.map((col , index) => {
                            return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{table} - {col}</option>)
                          }))
                        })}
                      </select> */}
                    <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.dltAxis(alias , "value")}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                  </div>
                </div>
            )})}

          <div className='w-full'><button className="green-btn relative left-1/2 !-translate-x-1/2 w-1/2 mt-1" onClick={() => chart_data.addAxis("value")}><i className="fa-solid fa-plus mr-1"></i>Yeni Satır Ekle</button></div>
        </div>
      </div>

      <ConditionsAndSort />
    </>
  )
}
