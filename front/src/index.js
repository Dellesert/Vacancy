import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


const getBaseUrl = () => {
  let url
  switch (process.env.REACT_APP_NODE_ENV) {
    case "production":
        url = 'api'
      break;
    case 'development':
    default:
        url = 'http://localhost:4201/api'
  }
  return url
}
axios.defaults.baseURL = getBaseUrl();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);
serviceWorkerRegistration.unregister();
reportWebVitals();

