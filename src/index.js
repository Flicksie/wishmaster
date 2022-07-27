import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/home';
import Test from './views/test';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        Wawa 
        <div className="content">
          <Routes>
            <Route path="/" element = {<App/>}/>
            <Route path="/test" element = { <Test/> }/>
          </Routes>
        </div>
      </div>      
    </BrowserRouter>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
