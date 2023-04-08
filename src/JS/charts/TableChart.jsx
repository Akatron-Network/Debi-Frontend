import React , { useState, useEffect, useContext } from 'react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import LoadingForCharts from './modals/LoadingForCharts';
import ErrorForCharts from './modals/ErrorForCharts';

export default function TableChart(props) {
  const chart_data = useContext(ChartContext);
  const [yAxis, setYAxis] = useState([]);
  const [yDatas, setYDatas] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let loading_type = 'loadingScreenTable' + props.panelID
    let error_type = 'errorScreenTable' + props.panelID
    chart_data.funcLoadForSpesific(loading_type, error_type, getData);
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    
    let where_plain = []
    for (let wp of props.wherePlain) {              // İlk başta propstan wherePlain ham halini aldık yani O/TBLCAHAR/BORC gibi halini.
      if (wp !== "AND") {                              // Sonrasında sadece BORC kısmını ayırıp where_plain içerisine yolladık
        let split = Object.keys(wp)[0].split("/")[2];
        let js = {[split] : Object.values(wp)[0]}
        where_plain.push(js)
      } else {
        where_plain.push("AND")
      }
    }

    let order = {}
    for (let keys in Object.keys(props.order)) {        // İlk başta keys kısmını döndürdük sonra içerisinde values döndürdük ve eşleştirdik
      for (let values in Object.values(props.order)){   // Daha sonra gerekli kısmı split ederek ortaya istediğimiz sonucu çıkardık
        order = {
          ...order,
          [Object.keys(props.order)[keys].split("/")[2]]: Object.values(props.order)[keys]
        }
      }
    }

    if (Object.keys(order).length === 0) order = undefined;

    if (where_plain.length === 0) where_plain = undefined;

    // Burada union mu değil mi diye kontrol ettik ve ona göre bir istek yolladık execute olarak
    if (props.unionID !== undefined) {
      
      var respData = await Data.postExecute({union_id: props.unionID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col.Data.connector.gateway_host);
    
    } else if (props.modelID.includes("View")) {

      let view_id = props.modelID.replace("_View" , "")
      let query = {table: view_id , where_plain: where_plain, order: order, select: props.select}
      var respData = await Data.postExecute({collection_id: chart_data.pageContent.collection_id, query}, col.Data.connector.gateway_host);
    
    } else {
      var respData = await Data.postExecute({model_id: props.modelID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order, columns: props.select}, col.Data.connector.gateway_host);
    }

    let yAxisTemp = [];
    var data = [];
    let panelcolumns = []

    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        panelcolumns = p.SelColumns.yAxis
        for(let y of p.SelColumns.yAxis) {
          yAxisTemp.push(y.col);
        }
      }
    }
    
    for(let d of respData.Data) {
      let el = []
      for(let y of panelcolumns) {
        el.push(d[y.col]);
      }
      data.push(el);
    }

    //. Sayı olan kolonları ayırdım sıralarına göre yani 2.kolondakilerin toplamı 12312, 1.kolondakilerin toplamı 12312 gibi {2: 12312, 1: 12312}
    let last_sum = {};
    for (let n of data) {
      for (let num in n) {
        if ((typeof(n[num]) === 'number')) {
          if (last_sum[num] === undefined) last_sum[num] = 0;

          if (Object.keys(last_sum).length !== 0) {
            last_sum = {
              ...last_sum,
              [num]: last_sum[num] + n[num]
            }
          }
          else {
            last_sum = {
              ...last_sum,
              [num]: n[num]
            }
          }
          setSum(last_sum)
        }
      }
    }

    setYDatas(data);
    setYAxis(yAxisTemp)
  }

  function currencyFormat(num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',')
  }

  return (
    <>
      <table className="w-full text-sm text-left text-grayXgray relative top-[54px] left-[1px] border-spacing-[inherit] border-separate">
        <thead className="text-xs text-cultured uppercase ">
          <tr>
            {yAxis.map((col, index) => {
              let type = "";
              if (col.includes("_SUM")) {
                col = col.split("_SUM")[0]
                type = " (Toplam)"
              }
              else if (col.includes("_AVG")) {
                col = col.split("_AVG")[0]
                type = " (Ortalama)"
              }
              else if (col.includes("_MIN")) {
                col = col.split("_MIN")[0]
                type = " (Minimum)"
              }
              else if (col.includes("_MAX")) {
                col = col.split("_MAX")[0]
                type = " (Maksimum)"
              }

              return(
                <th key={index} scope="col" className="px-2 py-3 top-[54px] sticky bg-darkest_jet border-b border-b-onyx_middle border-t border-t-jet_mid">{col}<span className='text-onyx_middle text-xs normal-case'>{type}</span></th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {yDatas.map((row, index) => {
            return(
              <tr key={index} className="bg-jet transition duration-200 hover:bg-onyx hover:text-platinium">
                {row.map((rowInside, index) => {
                  return(
                    <th key={index} className={(typeof(rowInside) === 'number') ? "px-2 py-1 font-normal border-b border-onyx truncate text-right" : "px-2 py-1 font-normal border-b border-onyx truncate"}>
                      {(typeof(rowInside) === 'number') ? currencyFormat(rowInside) : rowInside}
                    </th>
                  )
                })}
              </tr>
            )
          })}

          <tr>
            {yAxis.map((col, index) => {
              if(typeof(sum[index]) === 'number' && !col.includes("TARIH_")) {
                return(
                  <th key={index} className='px-2 py-2 bottom-0 sticky bg-darkest_jet font-light text-center text-platinium border-t border-onyx_middle'><span className='float-right text-sea_green'>{currencyFormat(sum[index])}</span></th>
                )
              }
              else {
                return(
                  <th key={index} className='px-2 py-2 bottom-0 sticky bg-darkest_jet border-t border-onyx_middle'></th>
                )
              }
            })}
          </tr>
        </tbody>
      </table>
      
      <LoadingForCharts id={"loadingScreenTable" + props.panelID} />
      <ErrorForCharts id={"errorScreenTable" + props.panelID} error={chart_data.errorText} />
    </>
  )
}


