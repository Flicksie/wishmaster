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
        <div className="App flex flex-col h-full">
          <nav className='bg-white p-2 pb-3'>

            <Navbar/>
          </nav>
          
          <div className="content">
            <Routes>
              
              <Route path="/" element = { <Home/> }/>
              
     
     
              
            
            </Routes>
          </div>

          <footer className='flex bg-slate-700 text-white grow'> *Footer goes here?* </footer> 

        </div>      
      </BrowserRouter>   
    </UserDataProvider>

);

reportWebVitals();