import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from './Landing';
import Game from './game/Game';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/game" component={Game} />
    </div>

    </Router>
  );
}

export default App;
