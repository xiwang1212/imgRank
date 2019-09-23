import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/game';
import { Button, Typography } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 90,
      refVideos: {},
      unknownVideos: {},
    }
  }

  componentDidMount() {
    this.setState({
      refVideos: this.retrieveRefVid(),
      unknownVideos: this.retrieveUnknownVid(),
    })
  }

  retrieveRefVid() {
    var video_tmp = "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4";
    return {"vidRef": video_tmp, "vidRef1" : video_tmp, "vidRef2": video_tmp}
  }

  retrieveUnknownVid() {
    var video_tmp = "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4";
    var videos = {}
    for (var i = 0; i < 5; i++) {
      videos["vidRef"+i] = video_tmp;
    }
    return videos;
  }

  render() {
    const { classes } = this.props;
    const ranking = ['Least Similar', 'Less Similar', 'Similar', 'More Similar', 'Most Similar'];
    return(
      <div className={classes.root}>
        <div className={classes.progressSection}>
          <Progress
            percent={this.state.percent}
            theme={
              {
                active: {
                  symbol: this.state.percent + '%',
                  trailColor: 'lightblue',
                  color: '#00b2dd'
                },
                success: {
                  symbol: this.state.percent + '%',
                  color: 'green'
                }
              }
            }
          />
        </div>
        <div className={classes.videoSection}>
          <Typography>
            Reference Videos
          </Typography>
          <div className={classes.referenceSection}>
            
            {
              Object.keys(this.state.refVideos).map(vidRef => (
                <video ref={vidRef} src={this.state.refVideos[vidRef]} type="video/mp4" className={classes.videoPlayer} />
              ))
            }
          </div>
        </div>
        <div className={classes.videoSection}>
          <Typography>
            Unknown Videos
          </Typography>
          <div className={classes.unknownSection}>
            {
              Object.keys(this.state.unknownVideos).map((vidRef, i) => (
                <div>
                <video ref={vidRef} src={this.state.unknownVideos[vidRef]} type="video/mp4" className={classes.videoPlayer} />
                <Typography>
                  {ranking[i]}
                </Typography>
                </div>
              ))
            }
          </div>
        </div>
        <div className={classes.nextButton}>
          <Button variant="contained" className={classes.nextButton}>
            NEXT
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Game);