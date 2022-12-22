import React , {useContext} from 'react'
import { ChartContext } from '../context';

export default function ConditionsAndSort() {
  const chart_data = useContext(ChartContext);
  console.log(chart_data)

  return (
    <>
    
      <hr className="mt-2 mb-3 border-1 w-full relative left-1/2 -translate-x-1/2 border-hr_gray" />
      <div className='flex mt-2'>
        
        <div className='w-1/2 pr-[6px] border-r border-hr_gray'>
          <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
            Koşullar
          </h1>
          
          <div className='grid grid-cols-12 col-span-1 gap-1 pt-2'>
            <span className="bg-black_light text-grayXgray border border-jet_mid flex items-center justify-center col-span-1 rounded">
              1.
            </span>
            <select defaultValue='default' className="condition_select xl:col-span-4">
              <option disabled value="default">Kolon Seçiniz</option>
            </select>
            <select defaultValue='equals' className="condition_select xl:col-span-2">
              <option value="equals">{'='}</option>
              <option value="not">{'!='}</option>
              <option value="bt">{'>'}</option>
              <option value="lt">{'<'}</option>
              <option value="bte">{'>='}</option>
              <option value="lte">{'<='}</option>
              <option value="like">{'içerir'}</option>
            </select>
            <input placeholder="Değer giriniz" className="condition_input !col-span-4" />
            <button className="danger-btn col-span-1 w-full"><i className="fa-solid fa-xmark"></i></button>
          </div>

          <div className='w-full text-center mt-2'><button className="green-btn"><i className="fa-solid fa-plus mr-1"></i>Koşul Ekle</button></div>
        </div>

        <div className='w-1/2 pl-[6px]'>
          <h1 className="text-base text-platinium mt-1 ml-[1px] drop-shadow">
            Sıralama
          </h1>

          <div className="form-control pt-2 w-full">
            <div className="input-group shadow-md">
              <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                Kolon Adı
              </span>
              <select
                defaultValue="default"
                className="condition_select max-w-[65%] !rounded-l-none"
                // ref={chart_data.yColSelRef}
              >
                <option disabled value="default">
                  Bir sıralama seçin...
                </option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}
