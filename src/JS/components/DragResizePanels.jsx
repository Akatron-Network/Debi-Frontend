import React from "react";
import PieChart from '../charts/PieChart'
import BasicLineCharts from '../charts/BasicLineCharts'
import AxisAlignWithTick from '../charts/AxisAlignWithTick'
import StackedLineCharts from '../charts/StackedLineCharts'
// import TemperatureGauge from '../charts/TemperatureGauge'
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
    // this.setState({ layouts });
  }

  render() {
    
    let value = this.context;
    console.log(value);
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
          draggableHandle={'.panels-title'}
          autoSize={true}
          isDraggable={value.allPanelsDragResize}
          isResizable={value.allPanelsDragResize}
          margin={[16, 16]} 
          {...this.props}
          // isBounded={true}
        >
          {value.pageContent.page_data.panels.map((panel) => {
            console.log(panel);
            if (panel.PanelType === "bar") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                  </div>
                  <span><AxisAlignWithTick modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                </div>
              )
            } else if (panel.PanelType === "treemap") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                  </div>
                  <span><BarLabelRotation modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                </div>
              )
            } else if (panel.PanelType === "line") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                  </div>
                  <span><BasicLineCharts modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                </div>
              )
            } else if (panel.PanelType === "mark") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                  </div>
                  <span><StackedLineCharts modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                </div>
              )
            } else if (panel.PanelType === "pie") {
              return (
                <div className="panels" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="panels-title w-full">
                    <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                  </div>
                  <span><PieChart modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                </div>
              )
            } else if (panel.PanelType === "table") {
              return (
                <div className="panels overflow-y-hidden" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="overflow-auto h-[inherit]">
                    <div className="panels-title pb-3 bg-middle_black shadow-md hover:bg-side_black transition duration-300 w-[calc(100%_-_12px)]">
                      <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                    </div>
                    <TableChart modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} />
                  </div>
                </div>
              )
            } else if (panel.PanelType === "pivot") {
              return (
                <div className="panels overflow-y-hidden" key={panel.PanelID} data-grid={panel.Coordinates}>
                  <div className="overflow-auto h-[inherit]">
                    <div className="panels-title pb-3 bg-middle_black shadow-md hover:bg-side_black transition duration-300 w-[calc(100%_-_12px)]">
                      <h1>{panel.PanelName}</h1>
                    {value.btnShowHide === true ?
                      <div>
                        <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" onClick={() => value.funcLoad(value.dltPanel, panel.PanelID)}><i className="fa-solid fa-xmark"></i></button>
                        <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base" onClick={() => value.funcLoad(value.editPanel, panel.PanelID)}><i className="fa-solid fa-pen-to-square"></i></label>
                      </div>
                    : undefined}
                    </div>
                    <span className="relative top-[54px] left-[1px]"><PivotTableChart modelID={panel.ModelID} unionID={panel.UnionID} panelID={panel.PanelID} wherePlain={panel.WherePlain} order={panel.Order} select={panel.GroupSelect} /></span>
                  </div>
                </div>
              )
            }
          })}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}


function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (localStorage) {
    localStorage.setItem(
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