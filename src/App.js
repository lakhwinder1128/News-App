import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import React, {useState} from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
 
  
} from "react-router-dom";

const App=()=> {
  const pageSize=6;
 const apiKey=process.env.REACT_APP_NEWS_API;

 

    return (
    <div>
     <Router> 
      <NavBar/>
      {/* <LoadingBar
        color='#f11946'
        progress={state.progress}
       
      /> */}
      <Routes>
           
          < Route exact strict path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" source="source" />}/>
          < Route exact strict path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" source="source" />}/>
          < Route exact strict path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" source="source" />}/>
          < Route exact strict path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" source="source" />}/>
          < Route exact strict path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" source="source" />}/>
          < Route exact strict path="/technology" element={<News apiKey={apiKey} key="technology"  pageSize={pageSize} country="in" category="technology"  source="source"/>}/>
          < Route exact strict path="/entertainment" element={<News apiKey={apiKey} key="entertainment"  pageSize={pageSize} country="in" category="entertainment" source="source" />}/>
          
        </Routes>
      </Router>
    </div>
    )
 
}

export default App