import React , { useContext } from 'react'
import { ModalContext, UnionDataModalContext } from '../context';
import "gridjs/dist/theme/mermaid.min.css";

export default function UnionTable(props) {
  const union_data = useContext(UnionDataModalContext)
  console.log(union_data)

  
  return (
    
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-grayXgray">
        <thead className="text-xs text-cultured uppercase bg-earie_black border-b border-onyx">
          <tr>
            {union_data.executeUnionCols.map((col, index) => {
              return(
                <th key={index} scope="col" className="px-2 py-3">{col.name}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {union_data.executeUnionRows.map((row, index) => {
            return(
              <tr key={index} className="bg-jet border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                {row.map((rowInside, index) => {
                  return(
                    <th key={index} className="px-2 py-1 truncate">{rowInside}</th>
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
