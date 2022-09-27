import React from 'react'
import * as echarts from '../../../node_modules/echarts/core';

export default function Deneme() {
  
  return (
    <div id="chart-container" className='relative h-screen overflow-hidden'>
      <button className='btn' onClick={a}>BUTON</button>
    </div>
  )

  function a() {
    var dom = document.getElementById('chart-container');
    var myChart = echarts.init(dom, 'dark', {
      renderer: 'svg',
      useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };


    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
  }

}
