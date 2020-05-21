import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  helpButton: {
    position: 'absolute',
    bottom: 0,
    left: '85%',
    backgroundColor: '#e0e0e0',
    color: '#000000',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      left: '0%',
      marginTop: 16,
    },
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CustomizedDialogs = ( props ) => {
  const [open, setOpen] = React.useState(false);

  const { classes } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.helpButton} variant="contained" onClick={handleClickOpen}>
        Help/Instructions
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          How to Play Image Rank
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You are shown 3 reference images (top row), and a set of 5 unknown
            images (bottom row). Your task is to rank the unknown images from most to least
            interesting images.
            You will need to:
          </Typography>
          <Typography gutterBottom>
            1. Order 5 unknown images by how interesting each is. Drag the unknown
          images around to order them!
          </Typography>
          <Typography gutterBottom>
            2. Click "NEXT" when you have complete the ranking and are ready to move to the next level!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CustomizedDialogs);
