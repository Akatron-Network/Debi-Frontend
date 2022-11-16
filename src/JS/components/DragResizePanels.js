import React from "react";
import PieChart from '../charts/PieChart'
import BasicLineCharts from '../charts/BasicLineCharts'
import AxisAlignWithTick from '../charts/AxisAlignWithTick'
import StackedLineCharts from '../charts/StackedLineCharts'
import TemperatureGauge from '../charts/TemperatureGauge'
import BarLabelRotation from '../charts/BarLabelRotation'
import TableChart from '../charts/TableChart'
import PivotTableChart from '../charts/PivotTableChart'

import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
import { ChartContext } from '../components/context';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

export default class ResponsiveLocalStorageLayout extends React.PureComponent {
  static contextType = ChartContext;

  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    let value = this.context;
    return (
      <div className="overflow-hidden">
        {/* <button className="btn ml-[10px]" onClick={() => this.resetLayout()}>Reset Layout</button> */}

        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          resizeHandles={[ "se" ]}
          autoSize={true}
          {...this.props}
          // isBounded={true}
        >
          {value.pageContent.page_data.panels.map((panel) => {
            if (panel.PanelType === "bar") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <span><AxisAlignWithTick modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                </div>
              )
            } else if (panel.PanelType === "treemap") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <span><BarLabelRotation modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                </div>
              )
            } else if (panel.PanelType === "line") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <span><BasicLineCharts modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                </div>
              )
            } else if (panel.PanelType === "mark") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <span><StackedLineCharts modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                </div>
              )
            } else if (panel.PanelType === "pie") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                  <span><PieChart modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                </div>
              )
            } else if (panel.PanelType === "table") {
              return (
                <div className="panels overflow-y-hidden" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="overflow-auto h-[inherit]">
                  <div className="panels-title pb-3 w-full bg-middle_black shadow-md hover:bg-side_black transition duration-300">
                    <h1>{panel.PanelName}</h1>
                    <button className="danger-btn float-right" onClick={() => value.dltPanel(panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                  </div>
                    <span className="relative top-12 left-[1px]"><TableChart modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                  </div>
                </div>
              )
            } else if (panel.PanelType === "pivot") {
              return (
                <div className="panels overflow-y-hidden" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="overflow-auto h-[inherit]">
                    <h1 className="panels-title pb-3 w-full bg-middle_black z-10 shadow-md hover:bg-side_black transition duration-300">{panel.PanelName}</h1>
                    <span className="relative top-12 left-[1px]"><PivotTableChart modelID={panel.ModelID} panelID={panel.PanelID} /></span>
                  </div>
                </div>
              )
            }
          })}

            {/*
            <div className="panels" key="5" data-grid={{ w: 4, h: 10, x: 4, y: 0, minW: 2, minH: 7}}>
              <h1 className="panels-title">Bar Label Rotation</h1>
              <span><BarLabelRotation /></span>
            </div>
            <div className="panels" key="4" data-grid={{ w: 4, h: 10, x: 0, y: 0, minW: 2, minH: 5}}>
              <h1 className="panels-title">Axis Align With Tick</h1>
              <span><AxisAlignWithTick /></span>
            </div>
            <div className="panels" key="2" data-grid={{ w: 4, h: 10, x: 4, y: 0, minW: 2, minH: 5}}>
              <h1 className="panels-title">Basic Line Charts</h1>
              <span><BasicLineCharts /></span>
            </div>
            <div className="panels" key="3" data-grid={{ w: 4, h: 10, x: 8, y: 0, minW: 2, minH: 7}}>
              <h1 className="panels-title">Stacked Line Charts</h1>
              <span><StackedLineCharts /></span>
            </div>
            <div className="panels" key="1" data-grid={{ w: 4, h: 10, x: 0, y: 0, minW: 3, minH: 7}}>
              <h1 className="panels-title">Pie Charts</h1>
              <span><PieChart /></span>
            </div>
            */}

            {/*
            <div className="panels" key="6" data-grid={{ w: 4, h: 10, x: 8, y: 0, minW: 3, minH: 8}}>
              <h1 className="panels-title">Temperature Gauge</h1>
              <span><TemperatureGauge /></span>
            </div>
            */}
          
          
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}


function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../layout-folders/test-hook.jsx").then(fn =>
    fn.default(ResponsiveLocalStorageLayout)
  );
}