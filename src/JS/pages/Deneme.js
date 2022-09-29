import React from 'react';
import ReactECharts from 'echarts-for-react';

const Page: React.FC = () => {
  const options = {
    // title: {
    //   show: true,
    //   text: "Ay ne güzel bi chartaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //   left: "left",
    //   top: "top",
    //   textAlign: "left",
    //   padding: [0, 0, 100, 0],
    //   textStyle: {
    //     fontSize: 20,
    //     color: "#20834B",
    //     fontFamily: "righteous",
    //     fontWeight: "bold",
    //     overflow: "truncate",
    //     width: 300
    //   },
    // },

    legend: {
      orient: "vertical",
      type: "scroll",
      right: 'right',
      align: "right",
      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      inactiveColor: "#858585",
      textStyle: {
        color: '#EBEBEB',
        fontStyle: "italic",
        overflow: "truncate",
      }
    },

    tooltip: {
      show: true
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
      },{
        value: 335,
        name: "Apple2"
      }, {
        value: 310,
        name: "Grapes2"
      }, {
        value: 234,
        name: "Pineapples2"
      }, {
        value: 135,
        name: "Orange2s"
      }, {
        value: 1548,
        name: "Bananas2"
      },{
        value: 335,
        name: "Appl3e"
      }, {
        value: 310,
        name: "Grape3s"
      }, {
        value: 234,
        name: "Pineapp3les"
      }, {
        value: 135,
        name: "Orange3s"
      },
    ],
      
      selectedMode: "multiple"
    }]
  };

  return <ReactECharts className='!h-full py-2' option={options} />;
};

export default Page;