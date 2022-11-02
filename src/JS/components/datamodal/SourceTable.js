import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function SourceTable() {
  
  const data = useContext(DataModalContext);
  console.log(data)
  return (
  <>
    <div className="form-control">
      <div className="input-group z-30 shadow-md">
        <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%]'>Kaynak Tablo</span>
        <input type="text" onClick={data.open_s_tbl} onChange={(event) => data.sourceTablesJSON(event)} ref={data.sourceTableInputRef} className="w-full text-left truncate h-auto overflow-hidden input my-0 input-bordered transition duration-300" />
        <button onClick={data.source_table} className='bg-black_light px-2 py-[7px] !rounded-r border border-jet_mid justify-center min-w-[35px] transition duration-300 hover:bg-side_black hover:text-platinium'><i className="fa-sharp fa-solid fa-chevron-down "></i></button>
      </div>
    </div>
      
    <div id="source_table" className='max-h-[230px] overflow-auto z-20 left-3 right-3 mt-[-5px] w-[calc(100%_-_1.5rem)] bg-black_light shadow-xl rounded absolute border border-onyx opacity-0 transition duration-300 -translate-y-16 hidden'>
      <div className="rounded">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Kategori</th>
              <th>Tablo adı</th>
            </tr>
          </thead>
          <tbody>
            {data.filteredData.slice(0,200).map(function (source , index) { //! Index for unique key (0 , 1 , 2 ...)
              var type = "";
              if(source.type !== "BASE TABLE") {type = <i className="fa-solid fa-eye text-sm"></i>}
              else {type = <i className="fa-solid fa-table-columns text-sm"></i>}

              var category = "";
              if(source.category === undefined) {category = "-"}
              else{category = source.category}

              var nameTable = "";
              if(source.name === undefined) {nameTable = source.table}
              else {nameTable = source.name + " (" + source.table + ")"}

              return (
                <tr key={index} onClick={() => data.chooseSource(source.table , category , nameTable )}>
                  <td>{type}</td>
                  <td>{category}</td>
                  <td>{nameTable}</td>
                  {/* <td id={"tooltip_" + index} className='bg-onyx left-[1%] px-2 min-h-[38px] w-56 whitespace-normal mt-1 absolute hidden rounded border border-onyx_middle cursor-default'>{source.details}</td> */}
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  
  </>
  )
}
