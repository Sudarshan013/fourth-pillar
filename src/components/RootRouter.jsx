import React, { Component,memo } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Community from './Community';
import CrimeAgainstAllJournalists from "./CrimeAgainstAllJournalists"
import Footer from './Footer';
import AboutUs from './AboutUs';

export default memo(function RootRouter(props) {
  return (
    <Router>
      <Route exact path="/">
        <Home {...props} />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/about_us">
        <AboutUs/>
      </Route>
      <Route exact path="/crimeAgainstJournalists">
        <CrimeAgainstAllJournalists/>
      </Route>
      <Route exact path="/community">
        <Community />
      </Route>
      <Footer/>
    </Router>
  );
})
