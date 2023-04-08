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
        
      <div className='flex mt-3'>
        <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
          Kolonlar
        </h1>

        <hr className="mb-3 mt-4 border-1 w-full ml-3 border-hr_gray" />
      </div>

      <div className='flex mt-2'>

        <div className="form-control mb-2 w-1/2 mr-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Dikey Eksen
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
          </div>
        </div>

        <div className="form-control mb-2 w-1/2 ml-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Yatay Eksen
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[40%] !rounded-l-none"
              ref={chart_data.xColSelRef}
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
      </div>

      {chart_data.allAxis.map((alias) => {

        return (
          <div key={alias} className='w-full'>
            <div className="form-control mb-2 w-1/2 pr-[6px]">
              <div className="input-group shadow-md">
                <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                  Dikey Eksen
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
                  className="condition_select max-w-[25%] rounded"
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
                <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.dltAxis(alias)}><i className="fa-solid fa-xmark"></i></button>
              </div>
            </div>
          </div>
      )})}

      <div className='w-full'><button className="green-btn !ml-[24.5%] mt-1 !-translate-x-1/2 w-1/4" onClick={chart_data.addAxis}><i className="fa-solid fa-plus mr-1"></i>Dikey Eksen Ekle</button></div>

      <ConditionsAndSort />
    </>
  )
}
