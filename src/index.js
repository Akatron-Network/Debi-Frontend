import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/CSS/index.css';
import '../src/CSS/theme.css';
import App from './JS/App';
import DragResizePanels from './JS/components/DragResizePanels'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root2 = ReactDOM.createRoot(document.getElementById('container'));
root2.render(
  <React.StrictMode>
    <DragResizePanels />
  </React.StrictMode>
);
