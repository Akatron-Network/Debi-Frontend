import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page: React.FC = () => {
  const options = {
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Apple", "Grapes", "Pineapples", "Oranges", "Bananas"]
    },
    series: [{
      type: "pie",
      roseType: false,
      data: [{
        value: 335,
        name: "Apple"
      }, {
        value: 310,
        name: "Grapes"
      }, {
        value: 234,
        name: "Pineapples"
      }, {
        value: 135,
        name: "Oranges"
      }, {
        value: 1548,
        name: "Bananas"
      }]
    }]
  };

  return <ReactECharts className='!h-full flex' option={options} />;
};

export default Page;