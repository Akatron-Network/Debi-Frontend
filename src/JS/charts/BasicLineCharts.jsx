import React , { useState, useEffect, useContext } from 'react';
import ReactECharts from 'echarts-for-react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';
import Loading from '../components/Loading';
import LoadingForCharts from './modals/LoadingForCharts';
import ErrorForCharts from './modals/ErrorForCharts';

const Page = (props) => {
  const chart_data = useContext(ChartContext);

  const [options, setOptions] = useState({});
  var xAxisData = [];
  var yAxisData = [];

  useEffect(() => {
    let loading_type = 'loadingScreenBasicLine' + props.panelID
    let error_type = 'errorScreenBasicLine' + props.panelID
    chart_data.funcLoadForSpesific(loading_type, error_type, getData);
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    // let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    let col = chart_data.pageContent.collection.connector.gateway_host
    
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
      
      var respData = await Data.postExecute({union_id: props.unionID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order}, col);
    
    } else if (props.modelID.includes("View")) {

      let view_id = props.modelID.replace("_View" , "")
      let query = {table: view_id , where_plain: where_plain, order: order, select: props.select}
      var respData = await Data.postExecute({collection_id: chart_data.pageContent.collection_id, query}, col);
    
    } else {
      var respData = await Data.postExecute({model_id: props.modelID , collection_id: chart_data.pageContent.collection_id, where_plain: where_plain, order: order, columns: props.select}, col);
    }

    let xAxis = {};
    let yAxis = {};

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
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            color: "#14B85B",
            fontFamily: "cabin",
            fontSize: 15,
            fontWeight: "bold",
            backgroundColor: "#333333"
          }
        },
      },
  
      grid: {
        left: '4%',
        right: '4%',
        bottom: '4%',
        top:'10%',
        containLabel: true
      },
  
      xAxis: {
        type: 'category',
        data: xAxisData,
        
        axisLine: {
          lineStyle: {
            color: "#B9B9B9"
          }
        },
        axisTick: {
          length: 6
        },
        axisLabel: {
          show: true,
          fontFamily: "cabin",
          fontWeight: "bold",
          fontSize: 14,
          rotate: -45,
          overflow: "truncate",
          width: 80,
        }
      },
  
      yAxis: {
        type: 'value',
        splitNumber: 6,
        splitLine: {
          lineStyle: {
            color: "#3D3D3D",
          }
        },
        axisLine: {
          lineStyle: {
            color: "#B9B9B9"
          }
        },
        axisTick: {
          length: 6
        },
        axisLabel: {
          show: true,
          fontFamily: "cabin",
          fontWeight: "bold",
          fontSize: 14,
        }
      },
  
      series: [{
          name: yAxis,
          data: yAxisData,
          type: 'line',
          symbolSize: 8,
          symbol: "circle",
  
          itemStyle: {
            shadowBlur: 5,
            shadowColor: "#14B85B",
            color: "#14B85B",
          },
          lineStyle: {
            color: "#20834B",
            width: 4,
          }
  
        }]
  
    });
  }

  // const options = {

  //   tooltip: {
  //     show: true,
  //     backgroundColor: "#3D3D3D",
  //     borderColor: "#333333",
  //     textStyle: {
  //       color: "#EBEBEB",
  //       fontFamily: "cabin",
  //       fontSize: 15,
  //     },
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "cross",
  //       label: {
  //         color: "#14B85B",
  //         fontFamily: "cabin",
  //         fontSize: 15,
  //         fontWeight: "bold",
  //         backgroundColor: "#333333"
  //       }
  //     },
  //   },

  //   grid: {
  //     left: '4%',
  //     right: '4%',
  //     bottom: '4%',
  //     top:'10%',
  //     containLabel: true
  //   },

  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      
  //     axisLine: {
  //       lineStyle: {
  //         color: "#B9B9B9"
  //       }
  //     },
  //     axisTick: {
  //       length: 6
  //     },
  //     axisLabel: {
  //       show: true,
  //       fontFamily: "cabin",
  //       fontWeight: "bold",
  //       fontSize: 14,
  //     }
  //   },

  //   yAxis: {
  //     type: 'value',
  //     splitNumber: 6,
  //     splitLine: {
  //       lineStyle: {
  //         color: "#3D3D3D",
  //       }
  //     },
  //     axisLine: {
  //       lineStyle: {
  //         color: "#B9B9B9"
  //       }
  //     },
  //     axisTick: {
  //       length: 6
  //     },
  //     axisLabel: {
  //       show: true,
  //       fontFamily: "cabin",
  //       fontWeight: "bold",
  //       fontSize: 14,
  //     }
  //   },

  //   series: [{
  //       data: [150, 230, 224, 218, 135, 147, 260],
  //       type: 'line',
  //       symbolSize: 8,
  //       symbol: "circle",

  //       itemStyle: {
  //         shadowBlur: 5,
  //         shadowColor: "#14B85B",
  //         color: "#14B85B",
  //       },
  //       lineStyle: {
  //         color: "#20834B",
  //         width: 4,
  //       }

  //     }]

  // };

  return (
    <>
      <ReactECharts className='!h-full pb-2 pt-12' option={options} />
      
      <LoadingForCharts id={"loadingScreenBasicLine" + props.panelID} />
      <ErrorForCharts id={"errorScreenBasicLine" + props.panelID} error={chart_data.errorText} />
    </>
  );
};

export default Page;