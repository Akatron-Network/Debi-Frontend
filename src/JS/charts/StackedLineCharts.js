import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page: React.FC = () => {
  const options = {

    tooltip: {
      show: true,
      backgroundColor: "#B9B9B9",
      borderColor: "#858585",
      textStyle: {
        color: "#292929",
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

    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
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

    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      
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

    series: [
      {
        name: 'Email',
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
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
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
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
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
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: 'Direct',
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
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: 'Search Engine',
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
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]

  };

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;