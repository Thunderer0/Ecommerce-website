import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
// import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Home from "./component/Home/Home.js"


function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <BrowserRouter>
    <Header />
    <Routes >
    <Route path="/" element={<Home/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>

  );
}

export default App;