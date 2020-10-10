import React, { Component,memo } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './Home';
import Dashboard from './Dashboard';
import Community from './Community';
import Navbar from './Navbar';

export default memo(function RootRouter(props) {
  return (
    <Router>
      <Route exact path="/">
        <Home {...props}/>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard/>
      </Route>
      <Route exact path="/community">
        <Community/>
      </Route>
    </Router>
  )
})
