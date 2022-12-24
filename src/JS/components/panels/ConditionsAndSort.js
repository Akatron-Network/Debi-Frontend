import React , {useContext} from 'react'
import { ChartContext } from '../context';

export default function ConditionsAndSort() {
  const chart_data = useContext(ChartContext);
  console.log(chart_data)

  return (
    <>
      <div className='flex mt-3'>
        <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
          Koşullar
        </h1>
  
        <hr className="mb-3 mt-4 border-1 w-full ml-3 border-hr_gray" />
      </div>
        
      <div className='grid grid-cols-2 gap-3 my-2'>

        {chart_data.conditions.map((cond, index) => {
          if (cond === "AND") return;
          else {

            return(
              <div key={index} className='grid grid-cols-12 gap-1 max-w-[423px] col-span-1'>
                <span className="bg-black_light text-grayXgray border border-jet_mid flex items-center justify-center col-span-1 rounded">
                  {cond}
                </span>
  
                <select defaultValue='default' className="condition_select xl:col-span-4" ref={(el) => {chart_data.conditionColumnSelect.current[cond] = el}}>
                  <option disabled value="default">Kolon Seçiniz</option>
                  {chart_data.colList.map((tbi) => {
                    let table = Object.keys(tbi)[0];
                    return (tbi[table].columns.map((col , index) => {
                      return (<option key={index} value={tbi[table].alias + "/" + table + "/" + col}>{table} - {col}</option>)
                    }))
                  })}
                </select>
  
                <select defaultValue='equals' className="condition_select xl:col-span-2" ref={(el) => {chart_data.conditionTransactionSelect.current[cond] = el}}>
                  <option value="equals">{'='}</option>
                  <option value="not">{'!='}</option>
                  <option value="bt">{'>'}</option>
                  <option value="lt">{'<'}</option>
                  <option value="bte">{'>='}</option>
                  <option value="lte">{'<='}</option>
                  <option value="like">{'içerir'}</option>
                </select>
  
                <input placeholder="Değer giriniz" className="condition_input !col-span-4" ref={(el) => {chart_data.conditionInput.current[cond] = el}}/>
  
                <button className="danger-btn col-span-1 w-full" onClick={() => chart_data.deleteCondition(cond)}><i className="fa-solid fa-xmark"></i></button>
              </div>
            )

          }})}

        <div className='col-span-1 inline-flex justify-center items-center'><button className="green-btn w-1/2" onClick={chart_data.addCondition}><i className="fa-solid fa-plus mr-1"></i>Yeni Koşul Ekle</button></div>
      </div>
        
      <div className='flex mt-5'>
        <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
          Sıralama
        </h1>
  
        <hr className="mb-3 mt-4 border-1 w-full ml-3 border-hr_gray" />
      </div>

        <div className='grid grid-cols-2 gap-3 my-2'>
          {chart_data.panelSort.map((sort, index) => {
            return(
              <div key={index} className="form-control w-full col-span-1">
                <div className="input-group shadow-md">
    
                  <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[21%] xl:truncate">
                    {index + 1}. Kolon
                  </span>
    
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[36%] !rounded-l-none"
                    ref={(el) => {chart_data.sortColumnSelect.current[sort] = el}}
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
    
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[36%] !rounded-r-none"
                    ref={(el) => {chart_data.sortColumnTypeSelect.current[sort] = el}}
                  >
                    <option disabled value="default">
                      Sıralama seçin...
                    </option>
                    <option value="ASC">Artan</option>
                    <option value="DESC">Azalan</option>
                  </select>
                  
                  <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => chart_data.deleteSort(sort)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              </div>
          )})}

          <div className='col-span-1 inline-flex justify-center items-center'><button className="green-btn w-1/2" onClick={chart_data.addSort}><i className="fa-solid fa-plus mr-1"></i>Yeni Sıralama Ekle</button></div>
        </div>

      <hr className="mt-5 mb-2 border-1 w-full relative left-1/2 -translate-x-1/2 border-hr_gray" />
    </>
  )
}
