import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/game';
import { Button, IconButton, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import HelpDialog from './Help';
import "react-sweet-progress/lib/style.css";
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;
const maxLevels = 20;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid*2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#81D2C7',

  borderRadius: 8,
  // styles we need to apply on draggables
  ...draggableStyle,
});


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'gray' : '	#E0E0E2',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
  width: 1600,
  borderRadius: 8,
});

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      snackBarMsg: '',
      levels: 1,
      percent: 0,
      refVideos: {},
      unknownVideos: {},
      ordering: [],
      groundTruth: 'vidRef0',
      chances: 1,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    if (this.props.history.action === "POP") {
      this.props.history.push('/'); // prevent people from directly accessing
    }
    this.setState({
      refVideos: this.retrieveRefVid(),
      unknownVideos: this.retrieveUnknownVid(),
    });
  }

  retrieveRefVid() {
    var video_tmp = "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4";
    return {"vidRef": video_tmp, "vidRef1" : video_tmp, "vidRef2": video_tmp, "vidRef3": video_tmp}
  }

  retrieveUnknownVid() {
    var video_tmp = "https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4";
    var video_tmp2 = "http://media.w3.org/2010/05/sintel/trailer.mp4";
    var video_tmp3 = "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
    var video = [video_tmp, video_tmp, video_tmp2, video_tmp3, video_tmp]
    var videos = {}
    for (var i = 0; i < 5; i++) {
      videos["vidRef"+i] = video[i];
    }
    this.setState({ordering: Object.keys(videos)});
    return videos;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const ordering = reorder(this.state.ordering, result.source.index, result.destination.index);
    this.setState({
      ordering
    });
  }

  _handleClick = () => {
    // Something that sends the results of ordering to server
    if (this.state.percent === 100) {
      this.props.history.push('/finish');
    }
    console.log("current ordering: ", this.state.ordering);
    if (this.state.ordering[0] !== this.state.groundTruth) {
      if (this.state.chances === 0) {
        this.props.history.push('/failure');
      }
      this._handleSnackbarOpen("The ordering for a vigilant is incorrect, you have one chance to correct it.");
      this.setState({ chances: this.state.chances - 1 });
      return;
    }
    this.setState({
      levels: this.state.levels + 1,
      percent: Math.round(Math.min((this.state.levels+1)/maxLevels*100, 100)),
      refVideos: this.retrieveRefVid(),
      unknownVideos: this.retrieveUnknownVid(),
      chances: 1,
    });
  }

  _handleSnackbarOpen(msg) {
    this.setState({
      snackbarOpen: true,
      snackbarMsg: msg,
    })
  }

  _handleSnackbarClose = (event, reason) => {
    this.setState({snackbarOpen: false});
  }

  render() {
    const { classes } = this.props;
    var labels = ["Most Similar", "More Similar", "Similar", "Less Similar", "Least Similar"];
    console.log("#state: ", this.state);
    return(
      <div className={classes.root}>
        <div className={classes.progressSection}>
          <Typography variant="h5">
            Progress: Level { this.state.levels } / {maxLevels}
          </Typography>
          <Progress
            percent={this.state.percent}
            theme={
              {
                active: {
                  symbol: this.state.percent + '%',
                  trailColor: '#7389AE',
                  color: '#416788'
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
          <Typography variant="h5">
            Reference Videos
          </Typography>
          <div className={classes.referenceSection}>
            <div className={classes.referenceBackground}>
            {
              Object.keys(this.state.refVideos).map(vidRef => (
                <video
                  ref={vidRef}
                  src={this.state.refVideos[vidRef]}
                  type="video/mp4"
                  className={classes.videoPlayerRef}
                  autoPlay
                  muted
                  controls
                  loop />
              ))
            }
            </div>
          </div>
        </div>
        <div className={classes.videoSection}>
          <Typography variant="h5">
            Unknown Videos
          </Typography>
          <div className={classes.unknownSection}>

            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.ordering.map((vidRef, index) => (
                      <div>
                        <div>
                        <Draggable key={vidRef} draggableId={vidRef} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <video 
                                src={this.state.unknownVideos[vidRef]}
                                type="video/mp4"
                                className={classes.videoPlayerUnknown}
                                autoPlay
                                muted
                                controls 
                                loop />
                              <Typography>
                                {labels[index]}
                              </Typography>
                            </div>
                          )}
                        </Draggable>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div className={classes.buttonSection}>
          <Button variant="contained" className={classes.nextButton} onClick={this._handleClick}>
            { this.state.percent === 100 ? "FINISH" : "NEXT" }
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={this._handleSnackbarClose}
            style={{flexWrap:"nowrap!important"}}
          >
            <SnackbarContent
              className={classes.snackbarError}
              message={
                <span id="client-snackbar" style={{display: 'flex',
                  alignItems: 'center',
                  flexWrap:'nowrap'}}>
                  <ErrorIcon style={{
                      opacity: 0.9,
                      marginRight: 8,
                      fontSize: 24,}}/>
                      {this.state.snackbarMsg}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  // backgroundColor="green"
                  className="icon-button-close"
                  onClick={this._handleSnackbarClose}
                >
                  <CloseIcon style={{color: 'white'}} />
                </IconButton>,
              ]}
            />
          </Snackbar>
          <HelpDialog className={classes.helpButton} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Game);