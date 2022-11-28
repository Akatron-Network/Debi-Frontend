import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function Relations() {
  
  const data = useContext(DataModalContext);
  
  const allRelations = (data.relations.inner).concat(data.relations.outer , data.relations.extra)

  return (
  <>
    <div className='absolute'>
      {allRelations.map(function(rel , index) {
        return (
          <div
            key={index}
            onMouseLeave={() => data.show_info(index + 1)}
            onClick={() => data.addRelatedTable(rel.table, rel.relation_definition , data.gatewayHost)}
            id={"card_s_tbl_" + (index + 1)}
            className="info_cards"
          >
            <h3 className="truncate text-sm text-green_pantone h-6">{rel.table}</h3>
            <h3 className="truncate text-sm text-platinium h-6">{rel.name}</h3>
            <hr className="my-1 border-1 w-4/5 relative border-hr_gray" />
            <h3 className="min-w-[264px] text-sm whitespace-normal overflow-hidden text-grayXgray">{rel.details}</h3>
          </div>
        )})}
      {/* {data.relations.outer.map(function(rel , index) {
        return(
          <div key={index} onMouseLeave={() => data.show_info(index + 1 , "outer")} onClick={() => data.addRelatedTable(index + 1 , "outer")} id={"card_s_tbl_outer_" + (index + 1)} className='info_cards'>
            <h3 className='truncate text-green_pantone'>{rel.table}</h3>
            <h3 className='truncate text-platinium'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-grayXgray '>{rel.details}</h3>
          </div>
      )})} */}
    </div>
  </>
  )
}
