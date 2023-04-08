import React , {useContext} from 'react'
import { UnionDataModalContext } from '../context'

export default function UnionColumns() {
  var union_data = useContext(UnionDataModalContext);
  
  return (
    <div className="w-full h-44 bg-darker_jet rounded shadow-md relative grid grid-cols-2 grid-flow-row auto-rows-max gap-2 p-2 overflow-auto border border-jet_mid border-r-0">
      {union_data.unionJSON.columns.map((cols, index) => {
        return (
          <div key={index} id={"union_column_" + index} className="form-control">
            <div className="input-group shadow-md">
              <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[28%] xl:truncate">
                {(index + 1) + ". Kolon"}
              </span>
              <input
                type="text"
                placeholder={(index + 1) + ". Kolon adı girin"}
                className="input my-0 input-bordered !rounded-none w-full h-auto"
                ref={(el) => {union_data.unionColumnsNameRef.current[index] = el}}
                onBlur={() => union_data.columnsNameSave(index)}
              />
              <button className="danger-btn h-auto w-[12%] !rounded-l-none !rounded-r" onClick={() => union_data.deleteColumns(index)}><i className="fa-solid fa-xmark"></i></button>
            </div>
          </div>
        )
      })}
    </div>
  );
}
