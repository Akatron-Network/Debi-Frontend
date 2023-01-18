import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/CSS/index.css';
import '../src/CSS/theme.css';
import '../src/CSS/loading.css';
import App from './JS/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //* findDOMNode hatası bunun yüzünden veriyor (react strict mode) https://www.kindacode.com/article/react-warning-finddomnode-is-deprecated-in-strictmode/

  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
