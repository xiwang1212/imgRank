import React, { Component } from 'react';


class Finish extends Component {

  render() {
    return(
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography variant="h2" className={classes.title}>
            You are done! Thank you for playing VidRank!
        </div>
      </div>
    );
  }
}

export default Finish;
