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
  var xAxis = {};
  var yAxis = [];

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    console.log(props);
    let resp = await Data.getModel(props.modelID);
    console.log(resp)
    let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    console.log(col);
    let query = resp.Data.query;
    let respData = await Data.postExecute({query: query , collection_id: chart_data.pageContent.collection_id}, col.Data.connector.gateway_host);
    console.log(respData);
    xAxis = {};
    yAxis = [];
  
    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        for (let x of p.SelColumns.yAxis) {
          yAxis.push(x.col); //* Burada y çoklu olduğundan bir listeye çektik ve aşağıda bu şekilde kullanacağız
        }
        xAxis = p.SelColumns.xAxis.col;
      }
    }
  
    console.log(xAxis)
    console.log(yAxis);
  
    for (let a of respData.Data) {
      xAxisData.push(a[xAxis])
      // yAxisData.push(a[yAxis])
    }
  
    for (let b of yAxis) {
      let dataList = [];
  
      for(let c of respData.Data) {
        dataList.push(c[b])
      }
  
      yAxisData.push({
        name: b,
        type: 'line',
        stack: 'Total',
        symbolSize: 8,
        symbol: "circle",
        itemStyle: {
          shadowBlur: 2,
        },
        lineStyle: {
          width: 4,
        },
        data: dataList
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
        top:'14%',
        containLabel: true
      },
  
      legend: {
        data: yAxis,
        orient: "horizontal",
        type: "scroll",
        itemGap: 20,
        itemWidth: 20,
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
  
      series: yAxisData,
  
    });
  }


  // setPptions({

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
  //     top:'14%',
  //     containLabel: true
  //   },

  //   legend: {
  //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  //     orient: "horizontal",
  //     type: "scroll",
  //     itemGap: 20,
  //     itemWidth: 20,
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

  //   series: [
  //     {
  //       name: 'Email',
  //       type: 'line',
  //       stack: 'Total',
  //       symbolSize: 8,
  //       symbol: "circle",
  //       itemStyle: {
  //         shadowBlur: 2,
  //       },
  //       lineStyle: {
  //         width: 4,
  //       },
  //       data: [120, 132, 101, 134, 90, 230, 210]
  //     },
  //     {
  //       name: 'Union Ads',
  //       type: 'line',
  //       stack: 'Total',
  //       symbolSize: 8,
  //       symbol: "circle",
  //       itemStyle: {
  //         shadowBlur: 2,
  //       },
  //       lineStyle: {
  //         width: 4,
  //       },
  //       data: [220, 182, 191, 234, 290, 330, 310]
  //     },
  //     {
  //       name: 'Video Ads',
  //       type: 'line',
  //       stack: 'Total',
  //       symbolSize: 8,
  //       symbol: "circle",
  //       itemStyle: {
  //         shadowBlur: 2,
  //       },
  //       lineStyle: {
  //         width: 4,
  //       },
  //       data: [150, 232, 201, 154, 190, 330, 410]
  //     },
  //     {
  //       name: 'Direct',
  //       type: 'line',
  //       stack: 'Total',
  //       symbolSize: 8,
  //       symbol: "circle",
  //       itemStyle: {
  //         shadowBlur: 2,
  //       },
  //       lineStyle: {
  //         width: 4,
  //       },
  //       data: [320, 332, 301, 334, 390, 330, 320]
  //     },
  //     {
  //       name: 'Search Engine',
  //       type: 'line',
  //       stack: 'Total',
  //       symbolSize: 8,
  //       symbol: "circle",
  //       itemStyle: {
  //         shadowBlur: 2,
  //       },
  //       lineStyle: {
  //         width: 4,
  //       },
  //       data: [820, 932, 901, 934, 1290, 1330, 1320]
  //     }
  //   ]

  // });

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;