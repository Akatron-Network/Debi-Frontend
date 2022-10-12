import { React } from "react";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

export default function MyComponent(props) {
  
  const grid = new Grid({
    columns: [{
      name: "NAME",
      sort: true,
    }, {
      name: "E-MAIL"
    }, {
      name: "PHONE NUMBER",
    }],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923']
    ],

    style: {
      // container: {
      //   'border-radius': '.25rem',
      // },
    },
    className: {
      th: '!bg-side_black !text-grayXgray !pt-[15px] !pb-[15px] !text-center border-none text-sm',
      td : '!bg-darkest_jet !text-grayXgray !transition !duration-300 !hover:bg-jet !hover:text-platinium',
      table: 'w-full rounded border-inherit',
      container: "table-wrapper"
    }
  });

  
  return (
      <Grid {...grid.props} />
  );
}



// https://codesandbox.io/s/gridjs-bpf9g?file=/src/App.js:0-633

// import { Grid } from "gridjs-react";
// import data from "./data.json";
// import "gridjs/dist/theme/mermaid.css";
// Over-ride css
// import "./styles.css";

// export default function App() {
//   const gridProps = new Grid({
//     data: data,
//     columns: [
//       "User",
//       "Date",
//       "Worktime",
//       "Worktime - Minutes",
//       "Empty",
//       "Pause",
//       "Holidays",
//       "Payless holidays"
//     ],
//     pagination: {
//       enabled: true,
//       limit: 15
//     },
//     className: {
//       container: "table-wrapper"
//     }
//   });

//   return (
//     <div className="App">
//       <h1>Grid</h1>
//       <Grid {...gridProps.props} />
//     </div>
//   );
// }