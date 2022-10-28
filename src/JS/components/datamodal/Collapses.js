import React , { useContext } from 'react'
import { DataModalContext } from '../context'

export default function Collapses() {
  
  const data = useContext(DataModalContext);

  return (
    
    <div tabIndex={0} id='collapse_1' onClick={() => data.checkbox(1)} className="collapse collapse-plus collapse_extra">

      <input id='checkbox_1' type="checkbox"  className='!min-h-0 !py-2 !px-4' />
      <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
        Tablo Kolonları - I
      </div>
      
      <div className="collapse-content text-graysix">

        <div className='table_layout'>
          <div id='card_elm_1' className="table_col_cards">
            <h4 className='text-sm'>SUBE_KODU</h4>
            <span className='text-xs'>İlgili kaydın hangi şube kodunda yapıldığını gösterir.</span>
          </div>
          <div id='card_elm_2' className="table_col_cards"></div>
          <div id='card_elm_3' className="table_col_cards"></div>
          <div id='card_elm_4' className="table_col_cards"></div>
          <div id='card_elm_5' className="table_col_cards"></div>
        </div>

      
        <div className='table_layout mt-6'>

          <div id='tbl1_card1' className="condition_row_cards border-l-red-400">
            <div className='col-span-12 mb-3'>
              <span className='float-left text-platinium'>#1</span>
              <button className='float-right text-red-400' onClick={() => data.chooseColor(1 , 1)}><i className="fa-solid fa-circle"></i></button>
            </div>
            <select className="condition_select xl:col-span-5">
              <option disabled selected>Small</option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <select className="condition_select xl:col-span-2">
              <option disabled selected> {'=>'} </option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <input type="text" placeholder="Type here" className="condition_input" />
            <div className='col-span-12'>
              <button className='float-right remove-btn'><i className="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
          
          
          
          <div id='tbl1_card2' className="condition_row_cards border-l-green-400">
            <button id='tbl1_bounder1' className='bounder' onClick={() => data.changeCondition(1 , 1)}>VEYA</button>
            <div className='col-span-12 mb-3'>
              <span className='float-left text-platinium'>#2</span>
              <button className='float-right text-green-400' onClick={() => data.chooseColor(1 , 2)}><i className="fa-solid fa-circle"></i></button>
            </div>
            <select className="condition_select xl:col-span-5">
              <option disabled selected>Small</option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <select className="condition_select xl:col-span-2">
              <option disabled selected> {'=>'} </option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <input type="text" placeholder="Type here" className="condition_input" />
            <div className='col-span-12'>
              <button className='float-right remove-btn'><i className="fa-solid fa-trash-can"></i></button>
            </div>
          </div>

          <div id='tbl1_card3' className="condition_row_cards border-l-blue-400">
            <button id='tbl1_bounder2' className='bounder' onClick={() => data.changeCondition(1 , 2)}>VEYA</button>
            <div className='col-span-12 mb-3'>
              <span className='float-left text-platinium'>#3</span>
              <button className='float-right text-blue-400' onClick={() => data.chooseColor(1 , 3)}><i className="fa-solid fa-circle"></i></button>
            </div>
            <select className="condition_select xl:col-span-5">
              <option disabled selected>Small</option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <select className="condition_select xl:col-span-2">
              <option disabled selected> {'=>'} </option>
              <option>Small Apple</option>
              <option>Small Orange</option>
              <option>Small Tomato</option>
            </select>
            <input type="text" placeholder="Type here" className="condition_input" />
            <div className='col-span-12'>
              <button className='float-right remove-btn'><i className="fa-solid fa-trash-can"></i></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
