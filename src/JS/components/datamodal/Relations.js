import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function Relations() {
  
  const data = useContext(DataModalContext);
  console.log(data.relations)

  return (
    <div className='w-full h-72 bg-darker_jet rounded shadow-md relative grid grid-cols-12 grid-flow-row auto-rows-max gap-2 p-2 overflow-auto border border-jet_mid border-r-0'>
      {data.relations.inner.map(function(rel , index) {
        return(
          <div key={index} onMouseEnter={() => data.show_info(index + 1 , "inner" , 'in')} onMouseLeave={() => data.clearTime(index + 1 , "inner")} onClick={() => data.addRelatedTable(index + 1 , "inner")} id={"card_elm_inner_" + (index + 1)} className="elm_info_cards">
            <h3 className='truncate text-sea_green'>{rel.table}</h3>
            <h3 className='truncate text-grayXgray'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-ellipsis text-onyx_light'>{rel.details}</h3>
          </div>
      )})}
      {data.relations.outer.map(function(rel , index) {
        return(
          <div key={index} onMouseEnter={() => data.show_info(index + 1 , "outer" , 'in')} onMouseLeave={() => data.clearTime(index + 1 , "outer")} onClick={() => data.addRelatedTable(index + 1 , "outer")} id={"card_elm_outer_" + (index + 1)} className="elm_info_cards">
            <h3 className='truncate text-sea_green'>{rel.table}</h3>
            <h3 className='truncate text-grayXgray'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-ellipsis text-onyx_light'>{rel.details}</h3>
          </div>
      )})}
    </div>
  )
}
