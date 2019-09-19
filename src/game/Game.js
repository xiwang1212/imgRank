import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/game';
import { Typography } from '@material-ui/core';

class Game extends Component {

  render() {
    return(
      <div>
        <Typography>
          Placeholder Text
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Game);