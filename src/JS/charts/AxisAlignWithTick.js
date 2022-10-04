import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page: React.FC = () => {
  const options = {

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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      
      axisLine: {
        lineStyle: {
          color: "#B9B9B9"
        }
      },
      axisTick: {
        length: 6,
        alignWithLabel: true
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

    series: [{
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
        
        itemStyle: {
          color: "#20834B"
        },
      }]

  };

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
};

export default Page;