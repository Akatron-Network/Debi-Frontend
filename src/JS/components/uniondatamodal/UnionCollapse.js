import React , { useContext } from 'react'
import { UnionDataModalContext , ModalContext } from '../context'
import Input from '../Input'

export default function UnionCollapse(props) {
  var union_data = useContext(UnionDataModalContext);
  const modal_data = useContext(ModalContext);
  console.log(modal_data)

  return (
    
    <div className="collapse collapse-plus collapse_extra hover:bg-darker_jet">
      <input type="checkbox" className="!min-h-0 !py-2 !px-4" />
      <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
        {props.index}
        <span className="text-onyx_light"> (Buraya kaynak adı girilince onblur olacak)</span>
      </div>

      <div className="collapse-content text-graysix">
        <div className="form-control w-full mb-2">
          <div className="input-group shadow-md">
            <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center w-[50%]  min-w-[35%] xl:truncate">
              Veri Modeli
            </span>
            <select
              defaultValue="default"
              className="condition_select max-w-[58%] pr-8 !rounded-none"
              ref={(el) => {if (union_data.unionSourceSelectRef.current !== null) union_data.unionSourceSelectRef.current[props.index] = el}}
              onChange={() => union_data.unionSourceSelectSave(props.index)}
            >
              <option disabled value="default">
                Bir veri modeli seçin...
              </option>

              {modal_data.modalList.map((model , index) => {
                return(
                  <option key={index} value={model.model_id}>{model.model_name}</option>
                )
              })}
            </select>
            <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r"><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        <Input value={"Kaynak Adı"} refName={props.ref} />
        
        <div className='grid grid-cols-3 gap-2'>
          <select
            defaultValue="default"
            className="condition_select col-span-1 pr-8 !rounded"
            // ref={(el) => {if (data.calcColRef.current !== null) data.calcColRef.current[calc] = el}}
            // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
          >
            <option disabled value="default">
              Kolon #1 seçin...
            </option>
          </select>
        </div>

        <div className="text-right">
          <button
            className="green-btn bg-danger hover:bg-danger_light mt-[8px]"
            // onClick={() => data.dltRelatedTable(props.main , props.keyID)}
          >
            <i className="fa-solid fa-xmark mr-2"></i>Kaynağı Sil
          </button>
        </div>
      </div>
    </div>
  )
}
