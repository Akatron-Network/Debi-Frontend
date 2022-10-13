import { React } from "react";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

export default function Table(props) {
  
  const grid = new Grid({
    
    sort: true,
    fixedHeader: true,
    // search: true,

    columns: [{
      name: "NAME",
      }, {
      name: "E-MAIL"
      }, {
      name: "PHONE NUMBER",
      }],

    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923'],
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
      ['Nisen', 'nis900@gmail.com', '313 333 1923'],
    ],

    className: {
      table: '!w-full !bg-darker_jet !table-auto',
      container: "table-wrapper"
    }
  });

  
  return (
      <Grid {...grid.props}/>
  );
}


