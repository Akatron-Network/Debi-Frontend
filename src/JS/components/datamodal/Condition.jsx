import React , { useContext , useState , useEffect , useRef } from 'react'
import { DataModalContext } from '../context'

export default function Condition(props) {
  
  const data = useContext(DataModalContext);
  console.log(data)
  var [bounderBtn, setBounderBtn] = useState(false);
  const [cols, setCols] = useState([]);

  const selEqRef = useRef("equals");
  const selColRef = useRef("default");
  const inputValueRef = useRef("");

  const [operator, setOperator] = useState("VE");
  const [operatorR, setOperatorR] = useState("AND");
  const [typeInput, setTypeInput] = useState("text");
  const [typeLength, setTypeLength] = useState("");

  useEffect(() => {
    console.log(props.alias)
    setBounderBtn(props.value > 0);
    setCols(data.tables[props.alias].source_table.columns)
  }, [])

  useEffect(() => {
    let cond = props.context;
    if (cols.length === 0) return;
    if (Object.keys(cond).length === 0) return;

    let col = Object.keys(cond)[0]
    let opr = Object.keys(cond[col])[0]
    let val = cond[col][opr]

    selColRef.current.value = col;
    selEqRef.current.value = opr;
    inputValueRef.current.value = val;

    let conj = props.conj;

    if (!conj) return;

    setOperatorR(conj)

    if (conj === "AND") setOperator("VE")
    else setOperator("VEYA")

  }, [cols])
  

  const changeOperator = (alias, value , colRef , eqRef , valueRef) => {
    var opr = "VE";
    if(operator === "VEYA") {
      setOperator("VE");
      setOperatorR("AND");
      opr = "AND";
    } else {
      setOperator("VEYA");
      setOperatorR("OR");
      opr = "OR";
      console.log(opr)
    }
    data.compile(alias, (value - 1), colRef, eqRef, valueRef, opr); //+ Valueyi -1 yollamamızın nedeni dataJSON içerisinde kaçıncı eleman olduğunu göstermek için.
  }

  const changeInput = () => {
    let ref = selColRef.current.value;
    let col_type = cols.filter((item) => item.name === ref)[0].type;

    if (col_type === "smallint" || col_type === "tinyint" || col_type === "int") {
      setTypeInput("number"); //* Burada sadece int olmalı yani float almamalı patterni ona göre yap!
      setTypeLength("");
    } else if (col_type === "decimal") {
      setTypeInput("number"); //* Burada sadece float olmalı yani int almamalı patterni ona göre yap!
      setTypeLength("");
    } else if (col_type === "datetime") {
      setTypeInput("date");
      setTypeLength("");
    } else if (col_type === "char") {
      setTypeInput("text");
      setTypeLength("1");
    } else if (col_type === "varchar") {
      setTypeInput("text");
      setTypeLength("");
    }
  };
  console.log(data.dataJSON);
  return (
    <div id={"condition_" + props.alias + "_" + props.value} className="condition_row_cards">
      <button className={'bounder ' + (bounderBtn ? null : "hidden")} id={"bounder_" + props.alias + "_" + props.value} onClick={() => changeOperator(props.alias , props.value , selColRef.current.value , selEqRef.current.value , inputValueRef.current.value)}>{operator}</button>
      <div className='col-span-12 mb-3'>
        <span className='float-left text-platinium h-2'>{"#" + ((props.value / 2) + 1)}</span>
        {/* <button className='float-right text-red-400' onClick={() => data.chooseColor(1 , 1)}><i className="fa-solid fa-circle"></i></button> */}
      </div>
      <select defaultValue='default' ref={selColRef} className="condition_select xl:col-span-5" onChange={() => { changeInput();  data.compile(props.alias , props.value , selColRef.current.value , selEqRef.current.value , inputValueRef.current.value , operatorR)}}>
        <option disabled value="default">Kolon Seçiniz</option>
        {cols.map((c , index) => {
          return (<option key={index} value={c.name}>{c.name}</option>)
        })}
      </select>
      <select defaultValue='equals' className="condition_select xl:col-span-2" ref={selEqRef} onChange={() => data.compile(props.alias , props.value , selColRef.current.value , selEqRef.current.value , inputValueRef.current.value , operatorR)}>
        <option value="equals">{'='}</option>
        <option value="not">{'!='}</option>
        <option value="bt">{'>'}</option>
        <option value="lt">{'<'}</option>
        <option value="bte">{'>='}</option>
        <option value="lte">{'<='}</option>
        <option value="like">{'içerir'}</option>
      </select>
      <input type={typeInput} maxLength={typeLength} placeholder="Değer giriniz" className="condition_input" ref={inputValueRef} onBlur={() => data.compile(props.alias , props.value , selColRef.current.value , selEqRef.current.value , inputValueRef.current.value , operatorR)} />
      <div className='col-span-12'>
        <button className='float-right remove-btn' onClick={() => data.removeCondition(props.alias , props.value)}><i className="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  )
}
