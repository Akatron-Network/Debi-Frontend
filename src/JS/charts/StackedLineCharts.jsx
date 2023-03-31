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
  }, [chart_data.pageContent.page_data])

  const getData = async () => {
    document.getElementById('loadingScreenStackedLine' + props.panelID).checked = true;
    
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
    document.getElementById('loadingScreenStackedLine' + props.panelID).checked = false;
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

  return (
    <>
      <ReactECharts className='!h-full pb-2 pt-12' option={options} />

      <input type="checkbox" id={"loadingScreenStackedLine" + props.panelID} className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="text-center">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          <div className="modal-action justify-center">
            <label htmlFor={"loadingScreenStackedLine" + props.panelID} className="gray-btn hidden">Kapat!</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;