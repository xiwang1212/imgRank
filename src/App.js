import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fontTheme } from './styles/theme';
import Landing from './Landing';
import Game from './game/Game';
import Finish from './Finish';


function App() {

  return (
    <Router basename="/vidrank">
      <MuiThemeProvider theme={fontTheme}>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route path="/game" component={Game} />
          <Route path="/finish" component={Finish} />
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
