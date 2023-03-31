import React , {useContext, useState} from 'react'
import { ChartContext } from '../context';

export default function ConditionsAndSort() {
  const chart_data = useContext(ChartContext);
  console.log(chart_data)

  // const getColList = (colList) => {
  //   let cols = []
  //   for (let t of colList) {
  //     let t_name = Object.keys(t)[0]
  //     let t_cols = t[Object.keys(t)[0]]['columns']
  //     let t_als = t[Object.keys(t)[0]]['alias']

  //     t_cols.map(c => {cols.push({
  //       table_name: t_name,
  //       column: (c.includes('|')) ? c.substring(c.indexOf('|') + 1) : c,
  //       alias: t_als
  //     })})

  //   }
  //   return cols.sort((a,b) => {
  //     if (a.column < b.column) return -1
  //   })
  // }

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
                  {chart_data.getColList(chart_data.colList).map((cobj, index) => {
                      return (<option key={index} value={cobj.alias + "/" + cobj.table_name + "/" + cobj.column}>{cobj.column}</option>)
                  })}
                </select>
  
                <select defaultValue='equals' onChange={(e) => chart_data.changeCondType(e.target.value, cond)} className="condition_select xl:col-span-2" ref={(el) => {chart_data.conditionTransactionSelect.current[cond] = el}}>
                  <option value="equals">{'='}</option>
                  <option value="not">{'!='}</option>
                  <option value="bt">{'>'}</option>
                  <option value="lt">{'<'}</option>
                  <option value="bte">{'>='}</option>
                  <option value="lte">{'<='}</option>
                  <option value="like">{'içerir'}</option>
                  <option value="btw">{'arasında'}</option>
                  <option value="nbtw">{'arasında değil'}</option>
                </select>

                <input placeholder="Değer giriniz" 
                  className="condition_input !col-span-4" ref={(el) => {chart_data.conditionInput.current[cond] = el}} 
                />
                <input placeholder="Büyük Değer" 
                  className="condition_input !col-span-2 hidden" ref={(el) => {chart_data.conditionInput2.current[cond] = el}} 
                />
                
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
              <div key={index} className="form-control w-full col-span-1 max-w-[423px]">
                <div className="input-group shadow-md">
    
                  <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[21%] xl:truncate">
                    {index + 1}. Kolon
                  </span>
    
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[47%] !rounded-l-none"
                    ref={(el) => {chart_data.sortColumnSelect.current[sort] = el}}
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
                    className="condition_select max-w-[25%] !rounded-r-none"
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
