import React, { Component } from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { styles } from './styles/landing';
import { fontTheme } from './styles/theme';
import { Typography, Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import tmp from './tmp.png';

class Landing extends Component {

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={fontTheme}>
          <div className={classes.root}>
            <Typography variant="h2">
              VidRank
            </Typography>
            <Typography variant="h5" style={{width: 800}}>
              Some description of what the goal of this game is. Can be two lines because there is space.
            </Typography>
            <div>
              <Typography variant="h5">
                How To Play:
              </Typography>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div>
                  <img src={tmp} />
                  <Typography>
                    Placeholder Text
                  </Typography>
                </div>
                <div>
                  <img src={tmp} />
                  <Typography>
                    Placeholder Text
                  </Typography>
                </div>
                <div>
                  <img src={tmp} />
                  <Typography>
                    Placeholder Text
                  </Typography>
                </div>
              </div>
              <Link to="/game" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large" className={classes.startButton}>
                  START
                </Button>
              </Link>
            </div>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Landing);