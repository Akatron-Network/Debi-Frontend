import React , { useContext } from 'react'
import { ModalContext, UnionDataModalContext } from '../context';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";
import { trTR } from "gridjs/l10n";

export default function UnionTable(props) {
  const modal_data = useContext(ModalContext);
  const union_data = useContext(UnionDataModalContext)
  console.log(union_data)
  console.log(modal_data)

  const grid = new Grid({
    
    sort: true,
    fixedHeader: true,
    // language: {
    //   noRecordsFound: 'Herhangi bir kayıt bulunamadı!',
    //   loading: 'Yükleniyor...',
    //   error: 'Veriler alınırken bir hata oluştu!',
    // },

    columns: union_data.executeUnionCols,
    data:  union_data.executeUnionRows,

    pagination: {
      enabled: props.pagination,
      limit: 2000,
    },
    className: {
      table: '!w-full !bg-darker_jet !table-auto',
      container: "table-wrapper"
    },
    language: trTR
  });

  
  return (
      <Grid {...grid.props}/>
  );
}
