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
import LoadingForCharts from './modals/LoadingForCharts';
import ErrorForCharts from './modals/ErrorForCharts';
// import { BarGaugeTitleSubtitle } from 'devextreme-react/bar-gauge';

export default function PivotTableCharts(props) {
  //, TR dil desteği için----
  loadMessages(trMessages);
  locale(navigator.language);
  //, -----------------------
  
  const [allData, setAllData] = useState(new PivotGridDataSource({}));
  var fields = [];
  
  const chart_data = useContext(ChartContext);
  
  useEffect(() => {
    let loading_type = 'loadingScreenPivot' + props.panelID
    let error_type = 'errorScreenPivot' + props.panelID
    chart_data.funcLoadForSpesific(loading_type, error_type, getData);
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    // let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    let col = chart_data.pageContent.collection.connector.gateway_host
    
    let where_plain = []
    for (let wp of props.wherePlain) {                 //, İlk başta propstan wherePlain ham halini aldık yani O/TBLCAHAR/BORC gibi halini.
      if (wp !== "AND") {                              //, Sonrasında sadece BORC kısmını ayırıp where_plain içerisine yolladık
        let split = Object.keys(wp)[0].split("/")[2];
        let js = {[split] : Object.values(wp)[0]}
        where_plain.push(js)
      } else {
        where_plain.push("AND")
      }
    }

    let order = {}
    for (let keys in Object.keys(props.order)) {        //, İlk başta keys kısmını döndürdük sonra içerisinde values döndürdük ve eşleştirdik
      for (let values in Object.values(props.order)){   //, Daha sonra gerekli kısmı split ederek ortaya istediğimiz sonucu çıkardık
        order = {
          ...order,
          [Object.keys(props.order)[keys].split("/")[2]]: Object.values(props.order)[keys]
        }
      }
    }

    if (Object.keys(order).length === 0) order = undefined;

    if (where_plain.length === 0) where_plain = undefined;

    //, Burada union mu değil mi diye kontrol ettik ve ona göre bir istek yolladık execute olarak
    if (props.unionID !== undefined) {
      
      var respData = await Data.postExecute({union_id: props.unionID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col);
    
    } else if (props.modelID.includes("View")) {

      let view_id = props.modelID.replace("_View" , "")
      let query = {table: view_id , where_plain: where_plain, order: order, select: props.select}
      var respData = await Data.postExecute({collection_id: chart_data.pageContent.collection_id, query}, col);
    
    } else {
      var respData = await Data.postExecute({model_id: props.modelID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order, columns: props.select}, col);
    }

    let proData = respData.Data[0]

    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        for (let x of p.SelColumns.xAxis) {
          if (x.dataColumn === true) { //, Eğer dataColumn true ise veri kolonları kısmına atacağız bu bilgileri
            fields.push({
              area: 'data',
              dataField: x.col,
              caption: x.col,
              dataType: 'number',
              summaryType: 'sum',
              format: { type: 'fixedPoint', precision: 2 }, // Format Tipleri --> https://js.devexpress.com/Documentation/22_1/ApiReference/Common/Object_Structures/Format/#formatter
            })
          }
          else {
            fields.push({
              area: 'column',
              dataField: x.col,
              caption: x.col,
              dataType: (typeof(proData[x.col]) === 'number') ? 'number' : undefined,
              //, summaryType: (typeof(proData[x.col]) === 'number') ? 'sum' : undefined,
              //, format: (typeof(proData[x.col]) === 'number') ? { type: 'fixedPoint', precision: 2 } : undefined, // Format Tipleri --> https://js.devexpress.com/Documentation/22_1/ApiReference/Common/Object_Structures/Format/#formatter
            })
          }
        }
        for (let y of p.SelColumns.yAxis) {
          fields.push({
            area: 'row',
            dataField: y.col,
            caption: y.col,
            dataType: (typeof(proData[y.col]) === 'number') ? 'number' : undefined,
            summaryType: (typeof(proData[y.col]) === 'number') ? 'sum' : undefined,
            //, format: (typeof(proData[y.col]) === 'number') ? 'currency' : undefined, //+ format={{ currency: 'EUR', maximumFractionDigits: 2 }}
            //, format: (typeof(proData[y.col]) === 'number') ? { type: 'fixedPoint', precision: 2 } : undefined, // Format Tipleri --> https://js.devexpress.com/Documentation/22_1/ApiReference/Common/Object_Structures/Format/#formatter
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
  //, const dataSource = new PivotGridDataSource({
  //,   fields: [{
  //,     caption: 'Region',
  //,     width: 120,
  //,     dataField: 'region',
  //,     area: 'row',
  //,   }, {
  //,     caption: 'City',
  //,     dataField: 'city',
  //,     width: 150,
  //,     area: 'row',
  //,     selector(data) {
  //,       return `${data.city} (${data.country})`;
  //,     },
  //,   }, {
  //,     dataField: 'date',
  //,     dataType: 'date',
  //,     area: 'column',
  //,   }, {
  //,     caption: 'Sales',
  //,     dataField: 'amount',
  //,     dataType: 'number',
  //,     summaryType: 'sum',
  //,     format: 'currency',
  //,     area: 'data',
  //,   }],
  //,   store: allData
  //, });
  

  return (
    <>
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
              enabled={false}
              allowSearch={true}
            />
          </PivotGrid>
        </React.Fragment>
      </div>
      
      <LoadingForCharts id={"loadingScreenPivot" + props.panelID} />
      <ErrorForCharts id={"errorScreenPivot" + props.panelID} error={chart_data.errorText} />
    </>
  )
}
