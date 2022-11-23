import React , { useContext } from 'react'
import { DataModalContext } from '../context'
import Input from '../Input';
import { getAlias } from '../../libraries/misc';

export default function GroupModal() {
  const data = useContext(DataModalContext);
  console.log(data);

  const addCalcCol = () => {
    let alias = getAlias(data.calcCols);
    console.log(alias)
    data.setCalcCols([...data.calcCols , alias]);

  }

  const dltCalcCol = (alias) => {
    data.setCalcCols(data.calcCols.filter(item => item !== alias))
  }

  return (
    <>
      <input type="checkbox" id="groupmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box p-4 bg-middle_black rounded w-[40%]">
          <h1 className="text-lg text-platinium mb-2 drop-shadow-lg ml-[2px]">Hesap Kolonu Oluştur</h1>
          <Input value={"Hesap Kolonu Adı"} refName={data.calcColNameRef} />
          <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />
          <h1 className="text-lg text-platinium mb-2 drop-shadow-lg ml-[2px]">Kolonlar</h1>
          
          {data.calcCols.map((calc) => {
            var colArr = [];
            for(let arr in data.calcModalCols) {
              colArr = colArr.concat(data.calcModalCols[arr])
            }
            
            return(
              <div key={calc} id={"calc_" + calc} className="form-control mb-2 w-full">
                <div className="input-group shadow-md">
                  <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center w-[50%]  min-w-[35%] xl:truncate">
                    {calc}
                  </span>
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[38%] pr-8 !rounded-l-none"
                    ref={(el) => {if (data.calcColRef.current !== null) data.calcColRef.current[calc] = el}}
                    // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
                  >
                    <option disabled value="default">
                      Bir kolon seçin...
                    </option>
                    {colArr.map((col , index) => {
                      if(col.table_alias === "main") {
                        col.table_alias = "O"
                      }
                      return(<option key={index} value={col.table_alias + "." + col.name}>{col.name} ({col.table_alias + " - " + col.table_name })</option>)
                    })}
                  </select>
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[20%] !rounded-l !rounded-r-none"
                    ref={(el) => {if (data.calcColTrRef.current !== null) data.calcColTrRef.current[calc] = el}}
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
                  <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => dltCalcCol(calc)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              </div>
            )
          })}
          
          <div className='w-full text-center'>
            {(data.calcCols.length < 26) ? ( <button onClick={() => addCalcCol()} className="green-btn"><i className="fa-solid fa-plus mr-1"></i>Yeni Kolon Ekle</button> ) : undefined }
          </div>

          <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

          <div className="form-control my-2">
            <div className="input-group shadow-md">
              <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>İşlem</span>
              <input type="text" placeholder="İşlem girin. Örn: (A + B) * C" className="input my-0 input-bordered !rounded-r w-full h-auto" ref={data.calcRef} />
            </div>
          </div>

          <span id='group_modal_warn_1' className='text-sm text-red-600 hidden'>Aynı kolon adına sahip başka bir kolon var. Lütfen Hesap Kolonu Adını değiştirin.</span>
          <span id='group_modal_warn_2' className='text-sm text-red-600 hidden'>Lütfen tüm bilgileri eksiksiz ve doğru bir şekilde doldurun.</span>
          
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