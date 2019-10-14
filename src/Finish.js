import React, { Component } from 'react';
import { Typography} from '@material-ui/core';


class Finish extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography variant="h2" className={classes.title}>
            You are done! Thank you for playing VidRank!
        </Typography>
        </div>
      </div>
    );
  }
}

export default Finish;
