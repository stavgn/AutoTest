import React from 'react';
import '@fontsource/roboto';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AutoTest from '@autotest/client'
import axios from 'axios'


const vcr = AutoTest.init('http://localhost:4000/data');
vcr.record(axios)
window.vcr = vcr;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
