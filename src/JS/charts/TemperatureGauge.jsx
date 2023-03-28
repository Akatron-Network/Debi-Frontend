import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page = () => {
  const options = {
  
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      top: '10%',
      containLabel: true
    },

    series: [
      
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#20834B'
        },
        progress: {
          show: true,
          width: 25
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 25,
            color:[[1, '#858585']]
          }
        },
        axisTick: {
          distance: -38,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#B9B9B9'
          }
        },
        splitLine: {
          distance: -45,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#B9B9B9'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#B9B9B9',
          fontSize: 18,
          fontFamily: "cabin",
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '70%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 50,
          fontFamily: "cabin",
          formatter: '{value} °C',
          color: 'auto'
        },
        data: [
          {
            value: 31
          }
        ]
      },

      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: '#1A6C3D'
        },
        progress: {
          show: true,
          width: 8
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color:[[1, '#606060']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 31
          }
        ]
      }
    ]
  };

  return (
    <>
      <ReactECharts className='!h-full pb-2 pt-12' option={options} />

      <input type="checkbox" id="loadingScreenBasicLine" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="text-center">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          <div className="modal-action justify-center">
            <label htmlFor="loadingScreenBasicLine" className="gray-btn hidden">Kapat!</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;