import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page: React.FC = () => {
  const options = {

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

    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      containLabel: true
    },

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

    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
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

  };

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;