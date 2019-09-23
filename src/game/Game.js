import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles/game';
import { Button, Typography } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "react-sweet-progress/lib/style.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#333333',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'black' : '	#444444',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 90,
      refVideos: {},
      unknownVideos: {},
      ordering: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.setState({
      refVideos: this.retrieveRefVid(),
      unknownVideos: this.retrieveUnknownVid(),
    });
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

  render() {
    const { classes } = this.props;
    console.log("#state: ", this.state);
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
                <video
                  ref={vidRef}
                  src={this.state.refVideos[vidRef]}
                  type="video/mp4"
                  className={classes.videoPlayer}
                  autoPlay
                  muted
                  controls
                  loop />
              ))
            }
          </div>
        </div>
        <div className={classes.videoSection}>
          <Typography>
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
                    {Object.keys(this.state.unknownVideos).map((vidRef, index) => (
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
                                className={classes.videoPlayer}
                                autoPlay
                                muted
                                controls 
                                loop />
                            </div>
                          )}
                        </Draggable>
                        </div>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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