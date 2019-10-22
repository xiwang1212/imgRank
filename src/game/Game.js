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

import $ from 'jquery';

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
  opacity: 0.9,
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


var jsdom = require("jsdom");

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
      groundTruth: [],
      workerId: this.gup('workerId') || 'dummy_id',
      chances: 1,
      vigilants: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);

  }

  componentDidMount() {
    var data = require("../hit_jsons/" + this.gup("task") + ".json");
    this.setState({
      sets: data,
    }, () => this.updateVideos());
  }

  updateVideos() {
    const currentSet = this.state.sets[this.state.currentLevel-1]
    const unknownVideos = {};
    currentSet['videos_to_rank'].forEach((vid) => unknownVideos[vid] = vid);
    this.setState({
      refVideos: currentSet['reference_videos'],
      unknownVideos: unknownVideos,
      ordering: currentSet['videos_to_rank'],
      groundTruth: currentSet['order'],
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
    return this.state.refVideos
  }

  retrieveUnknownVid() {
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

  addHiddenField(form, name, value) {
      // form is a jQuery object, name and value are strings
      var input = $("<input type='hidden' name='" + name + "' value=''>");
      input.val(value);
      form.append(input);
  }


  submitHIT() {
      var submitUrl = decodeURIComponent(this.gup("turkSubmitTo")) + MTURK_SUBMIT_SUFFIX;
      // var submitUrl = SANDBOX_SUBMIT;
      this.state.result['WorkerId'] = this.gup("workerId");
      this.state.result['AssignmentId'] = this.gup("assignmentId");
      fetch(submitUrl, {method: 'POST', mode: 'no-cors', body: JSON.stringify(this.state.result)})
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

  submitHITform() {
      var submitUrl = decodeURIComponent(this.gup("turkSubmitTo")) + MTURK_SUBMIT_SUFFIX;
      var form = $("#submit-form");

      console.log("Gup output for assignmentId, workerId:", this.gup("assignmentId"),this.gup("workerId"))
      this.addHiddenField(form, 'assignmentId', this.gup("assignmentId"));
      this.addHiddenField(form, 'workerId', this.gup("workerId"));
      var results = {
          'outputs': this.state.result
      };
      this.addHiddenField(form, 'results', JSON.stringify(results));

      $("#submit-form").attr("action", submitUrl);
      $("#submit-form").attr("method", "POST");
      $("#submit-form").submit();
  }

  _handleClick = () => {
    var currentResult = this.state.sets[this.state.currentLevel - 1]
    currentResult['human_ordering'] = this.state.ordering;
    this.state.result.push(currentResult);
    // Something that sends the results of ordering to server
    if (this.state.percent === 100) {
      this.setState({disabled: true});
      console.log("this is what is submitted: ", this.state.result);
      this.submitHITform();
      return;
    }

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
                                    className={classes.videoPlayerUnknown}
                                    autoPlay
                                    muted
                                    loop />
                                </div>
                                <Typography variant='h6' style={{ color: 'white' }}>
                                  {this.state.groundTruth[index].toString(10)}
                                </Typography>
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

        <form id="submit-form" name="submit-form">
        </form>

      </div>
    );
  }
}

export default withStyles(styles)(Game);