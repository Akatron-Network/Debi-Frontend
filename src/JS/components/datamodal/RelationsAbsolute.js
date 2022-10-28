import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function Relations() {
  
  const data = useContext(DataModalContext);

  return (
  <>
    <div className='absolute'>
      {data.relations.inner.map(function(rel , index) {
        return(
          <div key={index} onMouseLeave={() => data.show_info(index + 1 , "inner")} onClick={() => data.addRelatedTable(index + 1 , "inner")} id={"card_s_tbl_inner_" + (index + 1)} className='info_cards'>
            <h3 className='truncate text-green_pantone'>{rel.table}</h3>
            <h3 className='truncate text-platinium'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-grayXgray'>{rel.details}</h3>
          </div>
      )})}
      {data.relations.outer.map(function(rel , index) {
        return(
          <div key={index} onMouseLeave={() => data.show_info(index + 1 , "outer")} onClick={() => data.addRelatedTable(index + 1 , "outer")} id={"card_s_tbl_outer_" + (index + 1)} className='info_cards'>
            <h3 className='truncate text-green_pantone'>{rel.table}</h3>
            <h3 className='truncate text-platinium'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-grayXgray '>{rel.details}</h3>
          </div>
      )})}
    </div>
  </>
  )
}
