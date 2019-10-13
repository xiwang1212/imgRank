import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles/landing';
import { Typography, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import tmp from './tmp.png';
import StepOne from './example1.png';
import StepTwo from './ranking.png';
import StepThree from './button.png';

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
            Rank the videos according to how similar their action is to the
            reference videos!
          </Typography>
        </div>
        <div className={classes.descriptionSection}>
          <Typography variant="h4" className={classes.descriptionTitle}>
            How To Play:
          </Typography>
          <div className={classes.stepSection}>
            <div className={classes.singleStep}>
              <div className={classes.imageContainer}>
                <img src={StepOne} style={{height: 300}}/>
              </div>
              <Typography className={classes.stepText}>
                1. Watch the reference and unknown videos. Scroll to see all
                videos if necessary.
              </Typography>
            </div>
            <div className={classes.singleStep}>
              <div className={classes.imageContainer}>
                <img src={StepTwo} style={{width:380}}/>
              </div>
              <Typography className={classes.stepText}>
                2. Order 5 unknown videos by how similar each is to the general
                action represented by the reference videos. Drag the unknown
                videos around to order them!
              </Typography>
            </div>
            <div className={classes.singleStep}>
              <div className={classes.imageContainer}>
                <img src={StepThree} style={{width:380}}/>
              </div>
              <Typography className={classes.stepText}>
                3. Click "NEXT" when you're ready to move to the next level!
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.buttonSection}>
          <Link to={{pathname:"/game", search: this.props.location.search}} style={{ textDecoration: 'none' }}>
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
