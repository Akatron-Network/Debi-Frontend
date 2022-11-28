import React , { useContext , useState , useEffect , useRef } from 'react'
import { UnionDataModalContext , ModalContext } from '../context'
import Table from '../datamodal/Table';
import Input from '../Input';
import UnionColumns from './UnionColumns';

export default function UnionDataModal() {
  const modal_data = useContext(ModalContext);
  const union_data = useContext(UnionDataModalContext);
  console.log(modal_data)
  console.log(union_data);

  const unionNameRef = useRef("");
  const unionExplanationRef = useRef("");

  const refreshUnionTable = () => {

  }

  const saveUnion = () => {

  }

  const clearUnionModelInputs = () => {

  }

  return (
    <>
      <input type="checkbox" id="unionmodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Birleşik Model Oluştur
            </h1>

            <Input value={"Model Adı"} refName={unionNameRef} />
            <Input value={"Model Açıklaması"} refName={unionExplanationRef} />

            <h1 className="text-lg text-platinium mt-3 mb-2 drop-shadow">
              Kolonlar
            </h1>
            <UnionColumns />
            
            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />
            
            <div className="form-control w-full">
                <div className="input-group shadow-md">
                  <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center w-[50%]  min-w-[35%] xl:truncate">
                    Kaynak #1
                  </span>
                  <select
                    defaultValue="default"
                    className="condition_select max-w-[58%] pr-8 !rounded-none"
                    // ref={(el) => {if (data.calcColRef.current !== null) data.calcColRef.current[calc] = el}}
                    // onChange={() => chart_data.axisSel(chart_data.yColSelRef.current.value)}
                  >
                    <option disabled value="default">
                      Bir kaynak seçin...
                    </option>
                  </select>
                  <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r"><i className="fa-solid fa-xmark"></i></button>
                </div>
              </div>

              <button className='green-btn mt-2 left-1/2 relative -translate-x-1/2 w-1/3'>Kaynak Ekle</button>
            
          </div>

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative min-h-[570px] h-full">
            <h1 className="text-xl text-platinium mb-2 drop-shadow-lg pl-2 inline-flex">
              Ön İzleme
            </h1>
            <button className="green-btn float-right" onClick={() => refreshUnionTable()}>
              <i className="fa-solid fa-rotate"></i>
            </button>
            <div id="unionReview" className="w-full bg-darker_jet rounded shadow-md border border-jet_mid p-2">
              <div
                id="unionTableReview"
                className="w-full border border-onyx rounded shadow-md overflow-auto"
              >
                {/* <Table /> */}
              </div>
            </div>

            <div id="closeUnionModalBtn" className="bottom-3 right-3 absolute">
              <label htmlFor="unionmodal" onClick={clearUnionModelInputs} className="gray-btn mr-2">
                Kapat
              </label>
              <button onClick={() => saveUnion()} className="green-btn">Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
