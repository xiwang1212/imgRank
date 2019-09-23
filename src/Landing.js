import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles/landing';
import { Typography, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import tmp from './tmp.png';

class Landing extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography variant="h2" className={classes.title}>
            VidRank
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Some description of what the goal of this game is. Can be two lines because there is space.
          </Typography>
        </div>
        <div className={classes.descriptionSection}>
          <Typography variant="h5">
            How To Play:
          </Typography>
          <div className={classes.stepSection}>
            <div className={classes.singleStep}>
              <img src={tmp} />
              <Typography className={classes.stepText}>
                1. Watch the reference and unknown videos. Press buttons to
                play/pause all videos in a section. Scroll to see all videos.
              </Typography>
            </div>
            <div className={classes.singleStep}>
              <img src={tmp} />
              <Typography className={classes.stepText}>
                Order unknown videos by how similar each is to the main concept
                of the reference set using their labels A-E.
              </Typography>
            </div>
            <div className={classes.singleStep}>
              <img src={tmp} className={classes.stepImage}/>
              <Typography className={classes.stepText}>
                Click "NEXT" when you're ready to move to the next level!
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.buttonSection}>
          <Link to="/game" style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" className={classes.startButton}>
              START
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);