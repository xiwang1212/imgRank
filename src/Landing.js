import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles/landing';
import { Typography, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

class Landing extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography variant="h4" className={classes.title}>
            Image Rank
          </Typography>
          <Typography variant="h5" className={classes.subtitle}>
            Rank the images according to how interest they are!
          </Typography>
        </div>
        <div className={classes.descriptionSection}>
          <Typography variant="h4" className={classes.descriptionTitle}>
            How To Play:
          </Typography>
          <Typography variant="h5" className={classes.descriptionTitle}>
           You will be shown a set of 5 images. Your task is to rank the images from most to least
           interesting.
           You will need to:
          </Typography>
          <Typography variant="h4" className={classes.descriptionTitle}>
            Guidelines:
          </Typography>
          <Typography variant="h5" className={classes.descriptionTitle}>
            Order 5 images by how interesting each of them is to you. <b>Drag</b> the images around to order them!
          </Typography>
          {/*<Typography variant="h4" className={classes.descriptionTitle}>*/}
          {/*    Demo:*/}
          {/*</Typography>*/}
          {/*<video className={classes.centerVideo} src="https://www.dropbox.com/s/t5zb0pxtkwux4dg/vidrank_final.mp4?raw=1" controls>*/}
          {/*</video>*/}
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
