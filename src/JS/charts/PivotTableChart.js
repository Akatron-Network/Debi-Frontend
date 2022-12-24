import React , { useState, useEffect, useContext } from 'react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';
import 'devextreme/dist/css/dx.generic.attempt_1.css';
import trMessages from "devextreme/localization/messages/tr.json";
import { locale, loadMessages } from "devextreme/localization";
import PivotGrid, {
  FieldChooser,
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { BarGaugeTitleSubtitle } from 'devextreme-react/bar-gauge';

export default function PivotTableCharts(props) {
  //TR dil desteği için----
  loadMessages(trMessages);
  locale(navigator.language);
  //-----------------------
  
  const [allData, setAllData] = useState(new PivotGridDataSource({}));
  var fields = [];
  
  const chart_data = useContext(ChartContext);
  
  useEffect(() => {
    getData();
  }, [])

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
    console.log(where_plain)

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
    console.log(order);

    // Burada union mu değil mi diye kontrol ettik ve ona göre bir istek yolladık execute olarak
    if (props.modelID.includes("Union")) {
      let union_id = props.modelID.replace("_Union" , "")
      var respData = await Data.postExecute({union_id: union_id , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col.Data.connector.gateway_host);
    } else {
      var respData = await Data.postExecute({model_id: props.modelID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col.Data.connector.gateway_host);
    }

    let proData = respData.Data[0]

    console.log(proData)
    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        for (let x of p.SelColumns.xAxis) {
          console.log(proData[x.col])
          console.log(typeof(proData[x.col]))
          fields.push({
            area: 'column',
            dataField: x.col,
            caption: x.col,
            dataType: (typeof(proData[x.col]) === 'number') ? 'number' : undefined,
            summaryType: (typeof(proData[x.col]) === 'number') ? 'sum' : undefined,
          })
        }
        for (let y of p.SelColumns.yAxis) {
          fields.push({
            area: 'row',
            dataField: y.col,
            caption: y.col,
            dataType: (typeof(proData[y.col]) === 'number') ? 'number' : undefined,
            summaryType: (typeof(proData[y.col]) === 'number') ? 'sum' : undefined,
          })
        }
      }
    }

    setAllData(new PivotGridDataSource({
      fields: fields,
      store: respData.Data,
    }))
  }

  //* Data Example
  // const dataSource = new PivotGridDataSource({
  //   fields: [{
  //     caption: 'Region',
  //     width: 120,
  //     dataField: 'region',
  //     area: 'row',
  //   }, {
  //     caption: 'City',
  //     dataField: 'city',
  //     width: 150,
  //     area: 'row',
  //     selector(data) {
  //       return `${data.city} (${data.country})`;
  //     },
  //   }, {
  //     dataField: 'date',
  //     dataType: 'date',
  //     area: 'column',
  //   }, {
  //     caption: 'Sales',
  //     dataField: 'amount',
  //     dataType: 'number',
  //     summaryType: 'sum',
  //     format: 'currency',
  //     area: 'data',
  //   }],
  //   store: allData
  // });
  

  return (
    <div className="dx-viewport">
      <React.Fragment>
        <PivotGrid
          id="sales"
          dataSource={allData}
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          allowExpandAll={true}
          showBorders={true}
        >
          <FieldChooser
            enabled={true}
            allowSearch={true}
          />
        </PivotGrid>
      </React.Fragment>
    </div>
  )
}
