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
    top:'14%',
    containLabel: true
  },

  legend: {
    data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
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
    data: ['2012', '2013', '2014', '2015', '2016'],
    axisTick: { show: false },
    
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


  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      
    //   label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
    //   label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Desert',
      type: 'bar',
    //   label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'Wetland',
      type: 'bar',
    //   label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [98, 77, 101, 99, 40]
    }
  ]

  };
  
  

  return <ReactECharts className='!h-full pb-2 pt-12' option={options} />;
  
};



export default Page;