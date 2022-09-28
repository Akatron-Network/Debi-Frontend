import React from "react";
import Deneme from '../pages/Deneme'
import { WidthProvider, Responsive } from "react-grid-layout";
import '../../../node_modules/react-resizable/css/styles.css';
import '../../../node_modules/react-grid-layout/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveLocalStorageLayout extends React.PureComponent {
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
    return (
      <div className="mt-11 p-4">
        <button className="btn" onClick={() => this.resetLayout()}>Reset Layout</button>

        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          isBounded={true}
          {...this.props}
        >
          <div className="bg-gray-800" key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0}}>
            <span className="text"><Deneme /></span>
          </div>
          <div className="bg-gray-800" key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0}}>
            <span className="text">2</span>
          </div>
          <div className="bg-gray-800" key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0}}>
            <span className="text">3</span>
          </div>
          <div className="bg-gray-800" key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0}}>
            <span className="text">4</span>
          </div>
          <div className="bg-gray-800" key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0}}>
            <span className="text">5</span>
          </div>
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