import React , { useState, useEffect, useContext } from 'react';
import ReactECharts from 'echarts-for-react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';

const Page = (props) => {
  const chart_data = useContext(ChartContext);

  const [options, setOptions] = useState({});
  var xAxisData = [];
  var yAxisData = [];

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
    if (props.unionID !== undefined) {
      
      var respData = await Data.postExecute({union_id: props.unionID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col.Data.connector.gateway_host);
    
    } else if (props.modelID.includes("View")) {

      let view_id = props.modelID.replace("_View" , "")
      let query = {table: view_id , where_plain: where_plain, order: order, select: props.select}
      var respData = await Data.postExecute({collection_id: chart_data.pageContent.collection_id, query}, col.Data.connector.gateway_host);
    
    } else {
      var respData = await Data.postExecute({model_id: props.modelID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order, columns: props.select}, col.Data.connector.gateway_host);
    }

    let xAxis = {};
    let yAxis = {};
    var data = [];

    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        xAxis = p.SelColumns.xAxis.col;
        yAxis = p.SelColumns.yAxis.col;
      }
    }

    for(let a of respData.Data) {
      xAxisData.push(a[xAxis])
      yAxisData.push(a[yAxis])
    }

    for (let x in xAxisData) {
      data.push({
        value: yAxisData[x],
        name: xAxisData[x],
      })
    }

    setOptions({

      tooltip: {
        show: true,
        backgroundColor: "#3D3D3D",
        borderColor: "#333333",
        textStyle: {
          color: "#EBEBEB",
          fontFamily: "cabin",
          fontSize: 15,
        },
      },
  
      grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        top:'10%',
        containLabel: true
      },
  
      legend: {
        orient: "vertical",
        type: "scroll",
        right: 'right',
        top: 'center',
        align: "right",
        itemGap: 4,
        itemWidth: 15,
        itemHeight: 10,
        inactiveColor: "#858585",
        textStyle: {
          color: '#B9B9B9',
          fontStyle: "italic",
          fontFamily: "cabin",
          overflow: "truncate",
          fontSize: 13,
        }
      },
  
      series: [{
        left: "0%",
        width: '88%',
        selectedMode: "multiple",
        type: "pie",
        roseType: false,
  
        data: data,
  
        label: {
          color: "#B9B9B9",
          fontFamily: "cabin",
          fontSize: 15,
          alignTo: "edge",
          edgeDistance: "7%",
          distanceToLabelLine: 8
        },
  
        itemStyle: {
          borderColor: "#2E2E2E6B",
          borderWidth: 0.5
        }
      }],
  
    });
  }
  
  // setOptions({

  //   tooltip: {
  //     show: true,
  //     backgroundColor: "#3D3D3D",
  //     borderColor: "#333333",
  //     textStyle: {
  //       color: "#EBEBEB",
  //       fontFamily: "cabin",
  //       fontSize: 15,
  //     },
  //   },

  //   grid: {
  //     left: '4%',
  //     right: '4%',
  //     bottom: '4%',
  //     top:'10%',
  //     containLabel: true
  //   },

  //   legend: {
  //     orient: "vertical",
  //     type: "scroll",
  //     right: 'right',
  //     top: 'center',
  //     align: "right",
  //     itemGap: 4,
  //     itemWidth: 15,
  //     itemHeight: 10,
  //     inactiveColor: "#858585",
  //     textStyle: {
  //       color: '#B9B9B9',
  //       fontStyle: "italic",
  //       fontFamily: "cabin",
  //       overflow: "truncate",
  //       fontSize: 13,
  //     }
  //   },

  //   series: [{
  //     left: "0%",
  //     width: '88%',
  //     selectedMode: "multiple",
  //     type: "pie",
  //     roseType: false,

  //     data: [{
  //         value: 335,
  //         name: "Apple"
  //       }, {
  //         value: 310,
  //         name: "Grapes"
  //       }, {
  //         value: 234,
  //         name: "Pineapples"
  //       }, {
  //         value: 135,
  //         name: "Oranges"
  //       }, {
  //         value: 1548,
  //         name: "Bananas"
  //       },{
  //         value: 335,
  //         name: "Apple2"
  //       }, {
  //         value: 310,
  //         name: "Grapes2"
  //       }, {
  //         value: 234,
  //         name: "Pineapples2"
  //       }, {
  //         value: 135,
  //         name: "Orange2s"
  //       },
  //     ],

  //     label: {
  //       color: "#B9B9B9",
  //       fontFamily: "cabin",
  //       fontSize: 15,
  //       alignTo: "edge",
  //       edgeDistance: "7%",
  //       distanceToLabelLine: 8
  //     },

  //     itemStyle: {
  //       borderColor: "#2E2E2E6B",
  //       borderWidth: 0.5
  //     }
  //   }],

  // });

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;