import React , { useContext } from 'react'
import { DataModalContext } from '../context'
import Input from '../Input';
import { getAlias } from '../../libraries/misc';

export default function GroupModal() {
  const data = useContext(DataModalContext);
  console.log(data);

  const addCalcCol = () => {
    let alias = getAlias(data.calcCols);
    data.setCalcCols([...data.calcCols , alias]);

  }

  const dltCalcCol = (alias) => {

  }

  return (
    <>
      <input type="checkbox" id="groupmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box p-4 bg-middle_black rounded w-[30%]">
          <h1 className="text-lg text-platinium mb-2 drop-shadow-lg ml-[2px]">Hesap Kolonu Oluştur</h1>
          <Input value={"Hesap Kolonu Adı"} refName={data.calcColNameRef} />
          <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />
          <h1 className="text-lg text-platinium mb-2 drop-shadow-lg ml-[2px]">Kolonlar</h1>

          <div className="form-control mb-2 w-full">
            <div className="input-group shadow-md">
              <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                A
              </span>
              <select
                defaultValue="default"
                className="condition_select max-w-[58%] !rounded-l-none"
                ref={data.calcColRef}
                // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
              >
                <option disabled value="default">
                  Bir kolon seçin...
                </option>
                {/* {chart_data.colList.map((tbi) => {
                  let table = Object.keys(tbi)[0]
                  return (tbi[table].columns.map((col , index) => {
                    return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{table} - {col}</option>)
                  }))
                })} */}
              </select>
              <button className="danger-btn h-auto ml-[-3px] w-[8%] !rounded-l-none !rounded-r" onClick={() => data.dltCalcCol("A")}><i className="fa-solid fa-xmark"></i></button>
            </div>
          </div>

          {data.calcCols.map((calc) => {

            return(
              <div key={calc} className="form-control mb-2 w-full">
                <div className="input-group shadow-md">
                  <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                    {calc}
                  </span>
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[58%] !rounded-l-none"
                    ref={(el) => {if (data.calcColRef.current !== null) data.calcColRef.current[calc] = el}}
                    // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
                  >
                    <option disabled value="default">
                      Bir kolon seçin...
                    </option>
                    {/* {chart_data.colList.map((tbi) => {
                      let table = Object.keys(tbi)[0]
                      return (tbi[table].columns.map((col , index) => {
                        return (<option key={index} value={tbi[table].alias + "/" +table + "/" + col}>{table} - {col}</option>)
                      }))
                    })} */}
                  </select>
                  <button className="danger-btn h-auto ml-[-3px] w-[8%] !rounded-l-none !rounded-r" onClick={() => data.dltCalcCol(calc)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              </div>
            )
          })}
          
          <div className='w-full text-center'>
            <button onClick={() => addCalcCol()} className="green-btn flo"><i className="fa-solid fa-plus mr-1"></i>Yeni Kolon Ekle</button>
          </div>
          
          <div className="modal-action">
            <label htmlFor="groupmodal" onClick={data.clearCalcColInp} className="gray-btn">
              Kapat
            </label>
            <button onClick={() => data.saveCalcCol()} className="green-btn">Kaydet</button>
          </div>
        </div>
      </div>
    </>
  )
}