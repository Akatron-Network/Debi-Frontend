import React , { useState, useEffect, useContext } from 'react';
import ReactECharts from 'echarts-for-react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';

const Page = (props) => {
  const chart_data = useContext(ChartContext);
  console.log(props);

  const [options, setOptions] = useState({});
  var xAxisData = [];
  var yAxisData = [];

  useEffect(() => {
    getData();
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    //* Eski yöntem
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

    console.log(respData);

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
          type: "shadow",
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
          length: 6,
          alignWithLabel: false
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
        splitNumber: 3,
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
        },
      },

      series: [{
          name: yAxis,
          type: 'bar',
          barWidth: '60%',
          data: yAxisData,
          
          itemStyle: {
            color: "#20834B"
          },
        }]

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
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "shadow",
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
  //       length: 6,
  //       alignWithLabel: true
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
  //     },
  //     nameLocation: "end",
  //     name: "Bilmiyorum"
  //   },

  //   series: [{
  //       name: 'Direct',
  //       type: 'bar',
  //       barWidth: '60%',
  //       data: [10, 52, 200, 334, 390, 330, 220],
        
  //       itemStyle: {
  //         color: "#20834B"
  //       },
  //     }]

  // });

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
  //       type: "shadow",
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
  //       length: 6,
  //       alignWithLabel: true
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
  //     },
  //     nameLocation: "end",
  //     name: "Bilmiyorum"
  //   },

  //   series: [{
  //       name: 'Direct',
  //       type: 'bar',
  //       barWidth: '60%',
  //       data: [10, 52, 200, 334, 390, 330, 220],
        
  //       itemStyle: {
  //         color: "#20834B"
  //       },
  //     }]

  // };

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;