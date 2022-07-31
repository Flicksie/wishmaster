import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


// STYLE
import './index.css';


// ROUTES
import Home from './routes/home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <div className="App">
        
        <nav> *Nav goes here* </nav> 
        
        <div className="content">
          <Routes>
            
            <Route path="/" element = { <Home/> }/>

            

            
          
          </Routes>
        </div>

        <footer> *Footer goes here?* </footer> 

      </div>      
    </BrowserRouter>   

);

reportWebVitals();