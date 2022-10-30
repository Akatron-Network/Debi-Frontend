import React , { useContext , useState } from 'react'
import { DataModalContext } from '../context'

export default function Condition(props) {
  
  const data = useContext(DataModalContext);
  console.log(data)
  console.log(props);

  return (
    <div id={"condition_" + props.value} className="condition_row_cards">
      <button className='bounder'>VEYA</button>
      <div className='col-span-12 mb-3'>
        <span className='float-left text-platinium'>{"#" + (props.value + 1)}</span>
        {/* <button className='float-right text-red-400' onClick={() => data.chooseColor(1 , 1)}><i className="fa-solid fa-circle"></i></button> */}
      </div>
      <select defaultValue='default' className="condition_select xl:col-span-5">
        <option disabled value="default">Small</option>
        <option>Small Apple</option>
        <option>Small Orange</option>
        <option>Small Tomato</option>
      </select>
      <select defaultValue='default'  className="condition_select xl:col-span-2">
        <option disabled value="default"> {'=>'} </option>
        <option>Small Apple</option>
        <option>Small Orange</option>
        <option>Small Tomato</option>
      </select>
      <input type="text" placeholder="Type here" className="condition_input" />
      <div className='col-span-12'>
        <button className='float-right remove-btn' onClick={() => data.removeCondition(props.value)}><i className="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  )
}
