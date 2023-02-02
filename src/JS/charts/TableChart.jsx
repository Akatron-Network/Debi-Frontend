import React , { useState, useEffect, useContext } from 'react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

export default function TableChart(props) {
  const chart_data = useContext(ChartContext);
  console.log(chart_data);
  console.log(props)
  const [yAxis, setYAxis] = useState([]);
  const [yDatas, setYDatas] = useState([]);

  useEffect(() => {
    getData();
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    // let resp = await Data.getModel(props.modelID);
    // let query = resp.Data.query;
    // let respData = await Data.postExecute({query: query , collection_id: chart_data.pageContent.collection_id}, col.Data.connector.gateway_host);
    
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
    if (props.modelID.includes("Union")) {
      let union_id = props.modelID.replace("_Union" , "")
      var respData = await Data.postExecute({union_id: union_id , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col.Data.connector.gateway_host);
    
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
    setYDatas(data);
    setYAxis(yAxisTemp)
  }

  return (
    <div className="relative shadow-md">
      <table className="w-full text-sm text-left text-grayXgray">
        <thead className="text-xs text-cultured uppercase bg-darkest_jet border-b border-onyx">
          <tr>
            {yAxis.map((col, index) => {
              return(
                <th key={index} scope="col" className="px-2 py-3">{col}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {yDatas.map((row, index) => {
            return(
              <tr key={index} className="bg-jet border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                {row.map((rowInside, index) => {
                  return(
                    <th key={index} className="px-2 py-1 truncate">{rowInside}</th>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


