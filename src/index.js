import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserDataProvider from './contexts/UserData';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import { Authentication } from './data/AuthManager'

// STYLE
import './index.css';


// ROUTES
import Home from './routes/home';
import Navbar from './components/Navbar';


library.add(fas, faGithub)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserDataProvider>
      <BrowserRouter>
        <div className="App">
          
          <Navbar/>
          
          <div className="content">
            <Routes>
              
              <Route path="/" element = { <Home/> }/>

              

              
            
            </Routes>
          </div>

          <footer> *Footer goes here?* </footer> 

        </div>      
      </BrowserRouter>   
    </UserDataProvider>

);

reportWebVitals();