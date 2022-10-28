import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function Relations() {
  
  const data = useContext(DataModalContext);

  return (
  <>
    <div className='absolute'>
      {data.relations.inner.map(function(rel , index) {
        return(
          <div key={index} onMouseLeave={() => data.show_info(index+1 , "inner")} onClick={() => data.addRelatedTable(index+1 , "inner")} id={"card_s_tbl_inner_" + (index+1)} className='info_cards'>
            <h3 className='truncate'>AAAAAAAAAAAAAAAAAA</h3>
            <h3 className='truncate'>BBBBBBBBBBBBBBBBBB</h3>
            <h3 className='truncate'>CCCCCCCCCCCCCCCCCC</h3>
          </div>
      )})}
      {data.relations.outer.map(function(rel , index) {
        return(
          <div key={index} onMouseLeave={() => data.show_info(index+1 , "outer")} onClick={() => data.addRelatedTable(index+1 , "outer")} id={"card_s_tbl_outer_" + (index+1)} className='info_cards'>
            <h3 className='truncate'>AAAAAAAAAAAAAAAAAA</h3>
            <h3 className='truncate'>BBBBBBBBBBBBBBBBBB</h3>
            <h3 className='truncate'>CCCCCCCCCCCCCCCCCC</h3>
          </div>
      )})}
    </div>
  </>
  )
}
