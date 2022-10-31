import React , { useContext , useState , useEffect , useRef } from 'react'
import { DataModalContext } from '../context'

export default function Condition(props) {
  
  const data = useContext(DataModalContext);
  console.log(data)
  var [bounderBtn, setBounderBtn] = useState(false);
  const [cols, setCols] = useState([]);

  const selEqRef = useRef("equals");
  const selColRef = useRef("default");
  const selValueRef = useRef("");

  useEffect(() => {
    setBounderBtn(props.value > 0);
    setCols(data.tables[props.alias].source_table.columns)
  }, [])

  return (
    <div id={"condition_" + props.alias + "_" + props.value} className="condition_row_cards">
      <button className={'bounder ' + (bounderBtn ? null : "hidden")} id={"bounder_" + props.alias + "_" + props.value}>VEYA</button>
      <div className='col-span-12 mb-3'>
        <span className='float-left text-platinium h-2'>{"#" + ((props.value / 2) + 1)}</span>
        {/* <button className='float-right text-red-400' onClick={() => data.chooseColor(1 , 1)}><i className="fa-solid fa-circle"></i></button> */}
      </div>
      <select defaultValue='default' ref={selColRef} className="condition_select xl:col-span-5" onChange={() => data.compile("col", selColRef.current.value ,props.alias , props.value)}>
        <option disabled value="default">Kolon Seçiniz</option>
        {cols.map((c) => {
          return (<option value={c.name}>{c.name}</option>)
        })}
      </select>
      <select defaultValue='equals' className="condition_select xl:col-span-2" ref={selEqRef} onChange={() => data.compile("eq", selEqRef.current.value , props.alias , props.value)}>
        <option value="equals">{'='}</option>
        <option value="not">{'!='}</option>
        <option value="bt">{'>'}</option>
        <option value="lt">{'<'}</option>
        <option value="bte">{'>='}</option>
        <option value="lte">{'<='}</option>
        <option value="like">{'içerir'}</option>
      </select>
      <input type="text" placeholder="Değer giriniz" className="condition_input" ref={selValueRef} onBlur={() => data.compile("value" , selValueRef.current.value, props.alias , props.value)} />
      <div className='col-span-12'>
        <button className='float-right remove-btn' onClick={() => data.removeCondition(props.alias , props.value)}><i className="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  )
}
