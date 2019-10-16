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
const maxLevels = 10;
const SERVER_URL = "http://localhost:5000/"
const MTURK_SUBMIT_SUFFIX = "/mturk/externalSubmit";


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#000000',

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
      disabled: false,
      currentLevel: 1,
      sets: [],
      percent: Math.round(Math.min((1) / maxLevels * 100, 100)),
      refVideos: {},
      unknownVideos: {},
      ordering: [],
      result: [],
      // groundTruth: 'vidRef0',
      workerId: this.gup('workerId') || 'dummy_id',
      chances: 1,
      vigilants: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);

  }

  componentDidMount() {
    // if (this.props.history.action === "POP") {
    //   this.props.history.push('/'); // prevent people from directly accessing
    // }
    // TODO: Verify this is the correct placement of this logic in React App.
    var data = require('../hit_jsons/' + this.gup("task") + ".json");
    console.log("data: ", data);
    this.setState({
      sets: data,
    }, () => this.updateVideos());
    // this.fetchTaskData(this.state.workerId).then(res => {
    //   const refVideos = {}, rankVideos = {};
    //   res.refVideos.map((val) => refVideos[val] = RELATIVE_PATH + val);
    //   res.rankVideos.map((val) => rankVideos[val] = RELATIVE_PATH + val);
    //   this.setState({
    //     refVideos: refVideos,
    //     unknownVideos: rankVideos,
    //     ordering: Object.keys(rankVideos)
    //   })
    // });

  }

  updateVideos() {
    const currentSet = this.state.sets[this.state.currentLevel-1]
    const unknownVideos = {};
    currentSet['videos_to_rank'].forEach((vid) => unknownVideos[vid] = vid);
    this.setState({
      refVideos: currentSet['reference_videos'],
      unknownVideos: unknownVideos,
      ordering: currentSet['videos_to_rank'],
    })    
  }

  gup(name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var tmpURL = window.location.href;
    var results = regex.exec(tmpURL);
    if (results == null) return "";
    else return results[1];
  }

  async fetchTaskData(workerId) {
    // TODO: Discuss endpoint design.
    const url = SERVER_URL + `workerId?workerId=${workerId}`;
    const response =
      await fetch(url, {
        headers: { 'Content-Type': 'application/json' }
      });
    return await response.json()
  }

  async postTaskResponse(data) {
    // TODO: Discuss endpoint design.
    const url = SERVER_URL + 'response';
    const response =
      await fetch(url,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
    return await response.json();
  }

  retrieveRefVid() {
    // var videos = {}
    // for (let i = 0; i < 3; i++) {
    // videos[dummy_videos[i]] = RELATIVE_PATH + dummy_videos[i];
    // }
    // TODO: Update once we have better test data.
    return this.state.refVideos
  }

  retrieveUnknownVid() {
    // var videos = {}
    // for (var i = 0; i < 5; i++) {
    // videos[dummy_videos[i]] = RELATIVE_PATH + dummy_videos[i];
    // }
    // this.setState({ ordering: Object.keys(videos) });
    // return videos;
    // TODO: Update once we have better test data.
    return this.state.unknownVideos;
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

  submitHIT() {
      var submitUrl = decodeURIComponent(this.gup("turkSubmitTo")) + MTURK_SUBMIT_SUFFIX;
      this.state.result['WorkerId'] = this.gup("workerId");
      this.state.result['AssignmentId'] = this.gup("assignmentId");
      fetch(submitUrl, {method: 'POST', body: this.state.result})
          .then(res => {
            console.log("returning: ", res.json());
            return res.json();
          })  
          .then(data => {
              console.log("returning2: ", data);
          }) 
          .catch(err => {
              console.log("returning3: ", err);
          });
  }

  _handleClick = () => {
    var currentResult = this.state.sets[this.state.currentLevel - 1]
    currentResult['human_ordering'] = this.state.ordering;
    this.state.result.push(currentResult);
    // Something that sends the results of ordering to server
    if (this.state.percent === 100) {
      this.setState({disabled: true});
      console.log("this is what is submitted: ", this.state.result);
      this.submitHIT();
      return;
      // const dummy_data = { 'rankings': [1, 2, 3] };
      // this.postTaskResponse(dummy_data).then(resp => console.log(resp));

    }
    console.log("current ordering: ", this.state.ordering);
    // if (this.state.ordering[0] !== this.state.groundTruth) {
    //   if (this.state.chances === 0) {
    //     this.props.history.push('/failure');
    //   }
    //   this._handleSnackbarOpen("The ordering for a vigilant is incorrect, you have one chance to correct it.");
    //   this.setState({ chances: this.state.chances - 1 });
    //   return;
    // }
    
    this.setState({
      currentLevel: this.state.currentLevel + 1,
      percent: Math.round(Math.min((this.state.currentLevel + 1) / maxLevels * 100, 100)),
    }, () => this.updateVideos());
  }

  _handleSnackbarOpen(msg) {
    this.setState({
      snackbarOpen: true,
      snackbarMsg: msg,
    })
  }

  _handleSnackbarClose = (event, reason) => {
    this.setState({ snackbarOpen: false });
  }

  render() {
    const { classes } = this.props;
    var labels = ["Least Similar", "Less Similar", "Similar", "More Similar", "Most Similar"];
    console.log("#state: ", this.state);
    return (
      <div className={classes.root}>
        <Typography variant="h3">
          VidRank
        </Typography>
        <div className={classes.progressSection}>
          <Typography variant="h5">
            Progress: {this.state.currentLevel} / {maxLevels}
          </Typography>
          <Progress
            percent={this.state.percent}
            theme={
              {
                active: {
                  symbol: this.state.percent + '%',
                  color: 'green'
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
                  <div className={classes.videoContainerRef}>
                    <video
                      ref={vidRef}
                      src={this.state.refVideos[vidRef]}
                      type="video/mp4"
                      className={classes.videoPlayerRef}
                      autoPlay
                      muted
                      loop />
                  </div>
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
                                <div className={classes.videoContainer}>
                                  <video
                                    src={this.state.unknownVideos[vidRef]}
                                    type="video/mp4"
                                    className={classes.videoPlayerUnknown}
                                    autoPlay
                                    muted
                                    loop />
                                </div>
                                <Typography variant='h5' style={{ color: 'white' }}>
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
          <Button variant="contained" disabled={this.state.disabled} className={classes.nextButton} onClick={this._handleClick}>
            {this.state.percent === 100 ? "FINISH" : "NEXT"}
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={this._handleSnackbarClose}
            style={{ flexWrap: "nowrap!important" }}
          >
            <SnackbarContent
              className={classes.snackbarError}
              message={
                <span id="client-snackbar" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap'
                }}>
                  <ErrorIcon style={{
                    opacity: 0.9,
                    marginRight: 8,
                    fontSize: 24,
                  }} />
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
                  <CloseIcon style={{ color: 'white' }} />
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