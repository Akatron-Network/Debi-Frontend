import React, { useContext } from "react";
import { DataModalContext } from "../context";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { trTR } from "gridjs/l10n";

export default function Table(props) {
  const data = useContext(DataModalContext);
  console.log(data.executeCols);
  console.log(data.executeRows);
  
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-grayXgray">
        <thead className="text-xs text-cultured uppercase bg-earie_black border-b border-onyx">
          <tr>
            {data.executeCols.map((col, index) => {
              return(
                <th key={index} scope="col" className="px-2 py-3">{col.name}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.executeRows.map((row, index) => {
            return(
              <tr key={index} className="bg-jet border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                {row.map((rowInside, index) => {
                  return(
                    <th key={index} className="px-2 py-1 font-normal truncate">{rowInside}</th>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}


