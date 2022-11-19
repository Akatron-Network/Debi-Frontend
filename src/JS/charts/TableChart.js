import React , { useState, useEffect, useContext } from 'react';
import Data from '../libraries/categories/Data';
import WorkspaceAll from '../libraries/categories/Workspace';
import {ChartContext} from '../components/context';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

export default function TableChart(props) {
  const chart_data = useContext(ChartContext);
  console.log(chart_data);
  console.log(props)
  const [yAxis, setYAxis] = useState([]);
  const [yDatas, setYDatas] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let resp = await Data.getModel(props.modelID);
    let col = await WorkspaceAll.getCollections(chart_data.pageContent.collection_id); //! Get Gateway host
    let query = resp.Data.query;
    let respData = await Data.postExecute({query: query , collection_id: chart_data.pageContent.collection_id}, col.Data.connector.gateway_host);

    let yAxisTemp = [];
    var data = [];
    let panelcolumns = []

    for(let p of chart_data.pageContent.page_data.panels) {
      if (props.panelID === p.PanelID) {
        panelcolumns = p.SelColumns.yAxis
        for(let y of p.SelColumns.yAxis) {
          yAxisTemp.push(y.col);
        }
      }
    }

    for(let d of respData.Data) {
      let el = []
      for(let y of panelcolumns) {
        el.push(d[y.col]);
      }
      data.push(el);
    }
    setYDatas(data);
    setYAxis(yAxisTemp)
  }

  var grid = new Grid({
    sort: true,
    fixedHeader: true,
    // search: true,
    language: {
      noRecordsFound: 'Herhangi bir kayıt bulunamadı!',
      loading: 'Yükleniyor...',
      error: 'Veriler alınırken bir hata oluştu!',
    },

    columns: yAxis,
    data: yDatas,

    className: {
      table: '!w-full !bg-darker_jet !table-auto',
      container: "table-wrapper"
    }
  });


  return (
      <Grid {...grid.props}/>
  );
}


