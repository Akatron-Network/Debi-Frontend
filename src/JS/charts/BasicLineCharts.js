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
  }, [])

  const getData = async () => {
    let resp = await Data.getModel(props.modelID);
    let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    let query = resp.Data.query;
    let respData = await Data.postExecute({query: query , collection_id: chart_data.pageContent.collection_id}, col.Data.connector.gateway_host);

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
          rotate: 90,
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

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;