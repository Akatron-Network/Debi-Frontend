import React , { useContext } from 'react'
import { UnionDataModalContext , ModalContext } from '../context'

export default function UnionCollapse(props) {
  const union_data = useContext(UnionDataModalContext);
  const modal_data = useContext(ModalContext);

  return (
    
    <div className="collapse collapse-plus collapse_extra hover:bg-darker_jet">
      <input type="checkbox" className="!min-h-0 !py-2 !px-4" />
      <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
        {props.index + 1}
        <span className="text-onyx_light" ref={(el) => {union_data.unionSourceTitleNameRef.current[props.index] = el}}></span>
      </div>

      <div className="collapse-content text-graysix">
        <div className="form-control w-full mb-2">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center w-[50%]  min-w-[35%] xl:truncate">
              Veri Modeli
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[65%] pr-8 !rounded-r !rounded-l-none"
              ref={(el) => {union_data.unionSourceModelSelectRef.current[props.index] = el}}
              onChange={() => union_data.sourceModelSelect(props.index)}
            >
              <option disabled value="default">
                Bir veri modeli seçin...
              </option>

              {modal_data.modalList.map((model , index) => {
                return( <option key={index} value={model.model_id}>{model.model_name}</option> )
              })}
            </select>
          </div>
        </div>
        
        <div className="form-control mb-2">
          <div className="input-group shadow-md">
            <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Kaynak Adı</span>
            <input type="text" placeholder="Kaynak Adı girin" className="input my-0 input-bordered !rounded-l-none w-full h-auto" onBlur={ () => { union_data.sourceName(props.index) }} ref={(el) => {union_data.unionSourceNameRef.current[props.index] = el}} />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2'>
          {union_data.unionJSON.columns.map((cols, index) => {
            return(
              <select
                key={index}
                defaultValue="default"
                className="condition_select col-span-1 pr-8 !rounded"
                ref={(el) => {union_data.unionSourceColumnSelectRef.current[props.index + "_" + index] = el}}
                onChange={(e) => union_data.sourceColumnsSave(props.index, index , e.target.value)}
              >
                <option disabled value="default">
                  {index + 1}. Kolon seçin...
                </option>
                {(union_data.sourceColumns[props.index] !== undefined) ? union_data.sourceColumns[props.index].map(el => {
                  console.log(el);
                  return (el)
                }) : undefined}
              </select>
            )
          })}
        </div>

        <div className="text-right">
          <button
            className="green-btn bg-danger hover:bg-danger_light mt-[8px]"
            onClick={() => union_data.deleteSources(props.index)}
          >
            <i className="fa-solid fa-xmark mr-2"></i>Kaynağı Sil
          </button>
        </div>
      </div>
    </div>
  )
}
