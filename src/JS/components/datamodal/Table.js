import React, { useContext } from "react";
import { DataModalContext } from "../context";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

export default function Table() {
  const data = useContext(DataModalContext);
  
  const grid = new Grid({
    
    sort: true,
    fixedHeader: true,
    // search: true,
    language: {
      noRecordsFound: 'Herhangi bir kayıt bulunamadı!',
      loading: 'Yükleniyor...',
      error: 'Veriler alınırken bir hata oluştu!',
    },

    columns: data.executeCols,
    data:data.executeRows,

    className: {
      table: '!w-full !bg-darker_jet !table-auto',
      container: "table-wrapper"
    }
  });

  
  return (
      <Grid {...grid.props}/>
  );
}


