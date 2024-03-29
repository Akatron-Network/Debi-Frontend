import React, { useContext } from "react";
import { DataModalContext, MainContext } from "../context";

export default function Relations() {
  const data = useContext(DataModalContext);
  const { funcLoad } = useContext(MainContext);

  const allRelations = data.relations.inner.concat(data.relations.outer); //,data.relations.extra
  
  return (
    <div className="w-full h-72 bg-darker_jet rounded shadow-md relative grid grid-cols-12 grid-flow-row auto-rows-max gap-2 p-2 overflow-auto border border-jet_mid border-r-0">
      {allRelations.map(function (rel, index) {
        return (
          <div
            key={index}
            onMouseEnter={() => data.show_info(index + 1, "in")}
            onMouseLeave={() => data.clearTime(index + 1)}
            onClick={() => funcLoad(data.addRelatedTable, rel.table, rel.relation_definition , data.gatewayHost)}
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
      {data.relations.extra.map(function (rel, index) {
        return (
          <div
            key={index}
            onMouseEnter={() => data.show_info(allRelations.length + index + 1, "in")}
            onMouseLeave={() => data.clearTime(allRelations.length + index + 1)}
            onClick={() => funcLoad(data.addRelatedTable, rel.table, rel.relation_definition , data.gatewayHost)}
            id={"card_elm_" + (allRelations.length + index + 1)}
            className="elm_info_cards"
          >
            <h3 className="truncate text-sm text-yellow-700 h-6">{rel.table}</h3>
            <h3 className="truncate text-sm text-grayXgray h-6">{rel.name}</h3>
            <hr className="my-1 border-1 w-4/5 relative border-hr_gray" />
            <h3 className="min-w-[264px] text-sm whitespace-normal text-ellipsis text-onyx_light">
              {rel.details}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
