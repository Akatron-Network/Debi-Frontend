import React, { useContext } from "react";
import { DataModalContext } from "../context";

export default function Relations() {
  const data = useContext(DataModalContext);

  const allRelations = data.relations.inner.concat(data.relations.outer);

  return (
    <div className="w-full h-72 bg-darker_jet rounded shadow-md relative grid grid-cols-12 grid-flow-row auto-rows-max gap-2 p-2 overflow-auto border border-jet_mid border-r-0">
      {allRelations.map(function (rel, index) {
        return (
          <div
            key={index}
            onMouseEnter={() => data.show_info(index + 1, "in")}
            onMouseLeave={() => data.clearTime(index + 1)}
            onClick={() => data.addRelatedTable(rel.table, rel.relation_definition , data.gatewayHost)}
            id={"card_elm_" + (index + 1)}
            className="elm_info_cards"
          >
            <h3 className="truncate text-sm text-sea_green h-6">{rel.table}</h3>
            <h3 className="truncate text-sm text-grayXgray h-6">{rel.name}</h3>
            <hr className="my-1 border-1 w-4/5 relative border-hr_gray" />
            <h3 className="min-w-[264px] text-sm whitespace-normal text-ellipsis text-onyx_light">
              {rel.details}
            </h3>
          </div>
        );
      })}
      {/* {data.relations.outer.map(function(rel , index) {
        return(
          <div key={index} onMouseEnter={() => data.show_info(index + 1 , "outer" , 'in')} onMouseLeave={() => data.clearTime(index + 1 , "outer")} onClick={() => data.addRelatedTable(index + 1 , "outer")} id={"card_elm_outer_" + (index + 1)} className="elm_info_cards">
            <h3 className='truncate text-sea_green'>{rel.table}</h3>
            <h3 className='truncate text-grayXgray'>{rel.name}</h3>
            <hr className='my-1 border-1 w-4/5 relative border-hr_gray'/>
            <h3 className='overflow-hidden text-ellipsis text-onyx_light'>{rel.details}</h3>
          </div>
      )})} */}
    </div>
  );
}
