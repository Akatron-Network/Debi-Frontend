import React , {useContext} from 'react'
import { ChartContext , ModalContext } from '../../context';

export default function Bar() {
  const chart_data = useContext(ChartContext);
  const modal_data = useContext(ModalContext);
  console.log(chart_data)
  console.log(modal_data)

  return (
    <>
      <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
        Kolonlar
      </h1>

      <div className='flex mt-2'>

        <div className="form-control mb-2 w-1/2 mr-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Yatay Eksen
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[65%] !rounded-l-none"
              ref={chart_data.xColSelRef}
              // onChange={() => chart_data.axisSel(chart_data.xColSelRef.current.value)}
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

        <div className="form-control mb-2 w-1/2 ml-[6px]">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
              Dikey Eksen
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[65%] !rounded-l-none"
              ref={chart_data.yColSelRef}
              // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
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
      </div>
    </>
  )
}
